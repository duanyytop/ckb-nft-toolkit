const CKB = require('@nervosnetwork/ckb-sdk-core').default
const { secp256k1LockScript, secp256k1Dep, receiverSecp256k1Lock } = require('../account')
const { getCells, collectInputs, getLiveCell } = require('../collector')
const { FEE, NFTTypeScript, ClassTypeScript, ClassTypeDep, NFTTypeDep, IssuerTypeDep } = require('../constants/script')
const { UpdateActions } = require('../constants/types')
const { CKB_NODE_RPC, PRIVATE_KEY } = require('../utils/config')
const { u32ToBe } = require('../utils/hex')
const { TokenClass } = require('../models/class')
const { Nft } = require('../models/nft')

const ckb = new CKB(CKB_NODE_RPC)
const NFT_CELL_CAPACITY = BigInt(150) * BigInt(100000000)
const NORMAL_CELL_CAPACITY = BigInt(65) * BigInt(100000000)

const generateNftOutputs = async (inputCapacity, classTypeScripts) => {
  const lock = await secp256k1LockScript()
  let outputs = classTypeScripts.map(classTypeScript => ({
    capacity: `0x${NFT_CELL_CAPACITY.toString(16)}`,
    lock,
    type: classTypeScript,
  }))
  const changeCapacity = inputCapacity - FEE - NFT_CELL_CAPACITY * BigInt(classTypeScripts.length)
  outputs.push({
    capacity: `0x${changeCapacity.toString(16)}`,
    lock,
  })
  return outputs
}

const createNftCells = async (classTypeArgs, nftCount = 1) => {
  const lock = await secp256k1LockScript()
  const liveCells = await getCells(lock)
  const { inputs, capacity } = collectInputs(liveCells, NFT_CELL_CAPACITY * BigInt(nftCount))

  const classType = { ...ClassTypeScript, args: classTypeArgs }
  const classCells = await getCells(lock, classType)
  const classOutPoint = { txHash: classCells[0].out_point.tx_hash, index: classCells[0].out_point.index }
  const classInput = {
    previousOutput: classOutPoint,
    since: '0x0',
  }

  const classCell = await getLiveCell(classOutPoint)
  const tokenClass = TokenClass.fromString(classCell.data.content)
  if (tokenClass.total - tokenClass.issued < nftCount) {
    throw new Error('The class cell issued count overflow')
  }
  const classOutput = classCell.output
  let nftTypeScripts = []
  let nfts = []
  const nft = new Nft(0, [0, 0, 0, 0, 0, 0, 0, 0], 0, 0, '').toString()
  for (let i = 0; i < nftCount; i++) {
    nftTypeScripts.push({
      ...NFTTypeScript,
      args: `${classTypeArgs}${u32ToBe(tokenClass.issued + i)}`,
    })
    nfts.push(nft)
  }

  const outputClass = TokenClass.fromString(classCell.data.content)
  outputClass.updateIssued(tokenClass.issued + nftCount)

  const outputs = await generateNftOutputs(capacity, nftTypeScripts)
  const cellDeps = [await secp256k1Dep(), ClassTypeDep, NFTTypeDep]

  const rawTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs: [classInput, ...inputs],
    outputs: [classOutput, ...outputs],
    outputsData: [outputClass.toString(), ...nfts, '0x'],
  }
  rawTx.witnesses = rawTx.inputs.map((_, i) => (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }))
  const signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx)
  console.log(JSON.stringify(signedTx))
  const txHash = await ckb.rpc.sendTransaction(signedTx)
  console.info(`Creating nft cells tx has been sent with tx hash ${txHash}`)
  return txHash
}

const transferNftCells = async nftOutPoints => {
  const inputs = nftOutPoints.map(outPoint => ({
    previousOutput: outPoint,
    since: '0x0',
  }))

  let outputs = []
  let outputsData = []
  const receiverLock = await receiverSecp256k1Lock()
  for await (let outPoint of nftOutPoints) {
    const nftCell = await getLiveCell(outPoint)
    outputs.push({ ...nftCell.output, lock: receiverLock })
    outputsData.push(nftCell.data.content)
  }
  outputs[0].capacity = `0x${(BigInt(outputs[0].capacity) - FEE).toString(16)}`

  const cellDeps = [await secp256k1Dep(), NFTTypeDep]

  const rawTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData,
  }
  rawTx.witnesses = rawTx.inputs.map((_, i) => (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }))
  const signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx)
  console.log(JSON.stringify(signedTx))
  const txHash = await ckb.rpc.sendTransaction(signedTx)
  console.info(`Transfer nft cells tx has been sent with tx hash ${txHash}`)
  return txHash
}

const destroyNftCell = async nftOutPoint => {
  const inputs = [
    {
      previousOutput: nftOutPoint,
      since: '0x0',
    },
  ]
  const nftCell = await getLiveCell(nftOutPoint)
  const output = nftCell.output
  output.capacity = `0x${(BigInt(output.capacity) - FEE).toString(16)}`
  output.type = null
  const outputs = [output]
  const outputsData = ['0x']

  const cellDeps = [await secp256k1Dep(), NFTTypeDep]

  const rawTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData,
  }
  rawTx.witnesses = rawTx.inputs.map((_, i) => (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }))
  const signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx)
  console.log(JSON.stringify(signedTx))
  const txHash = await ckb.rpc.sendTransaction(signedTx)
  console.info(`Destroy nft cell tx has been sent with tx hash ${txHash}`)
  return txHash
}

const destroyNftCellWithIssuerLock = async (issuerOutPoint, nftOutPoint) => {
  const lock = await secp256k1LockScript()
  const liveCells = await getCells(lock)
  const { inputs: normalCells } = collectInputs(liveCells, NORMAL_CELL_CAPACITY)

  const inputs = [
    normalCells[0],
    {
      previousOutput: nftOutPoint,
      since: '0x0',
    },
  ]
  const issuerCellDep = { outPoint: issuerOutPoint, depType: 'code' }

  let outputs = []
  const issuerNormalCell = await getLiveCell(normalCells[0].previousOutput)
  outputs.push(issuerNormalCell.output)
  outputs[0].capacity = `0x${(BigInt(outputs[0].capacity) - FEE).toString(16)}`

  const nftCell = await getLiveCell(nftOutPoint)
  outputs.push(nftCell.output)
  outputs[1].type = null

  const outputsData = ['0x', '0x']

  const cellDeps = [issuerCellDep, await secp256k1Dep(), NFTTypeDep, IssuerTypeDep]

  const rawTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData,
  }
  rawTx.witnesses = rawTx.inputs.map((_, i) => (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }))
  const signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx)
  console.log(JSON.stringify(signedTx))
  const txHash = await ckb.rpc.sendTransaction(signedTx)
  console.info(`Destroy nft cell with issuer lock has been sent with tx hash ${txHash}`)
  return txHash
}

const destroyNftCellWithClassLock = async (classOutPoint, nftOutPoint) => {
  const lock = await secp256k1LockScript()
  const liveCells = await getCells(lock)
  const { inputs: normalCells } = collectInputs(liveCells, NORMAL_CELL_CAPACITY)

  const inputs = [
    normalCells[0],
    {
      previousOutput: nftOutPoint,
      since: '0x0',
    },
  ]

  const classCellDep = { outPoint: classOutPoint, depType: 'code' }

  let outputs = []
  const classCell = await getLiveCell(normalCells[0].previousOutput)
  outputs.push(classCell.output)
  outputs[0].capacity = `0x${(BigInt(outputs[0].capacity) - FEE).toString(16)}`

  const nftCell = await getLiveCell(nftOutPoint)
  outputs.push(nftCell.output)
  outputs[1].type = null

  let outputsData = ['0x', '0x']

  const cellDeps = [classCellDep, await secp256k1Dep(), NFTTypeDep, ClassTypeDep]

  const rawTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData,
  }
  rawTx.witnesses = rawTx.inputs.map((_, i) => (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }))
  const signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx)
  console.log(JSON.stringify(signedTx))
  const txHash = await ckb.rpc.sendTransaction(signedTx)
  console.info(`Destroy nft cell with class lock has been sent with tx hash ${txHash}`)
  return txHash
}

const updateNftCell = async (
  nftOutPoint,
  action,
  { extInfo, characteristic, issuerOutPoint, classOutPoint, state },
) => {
  if (!action) {
    throw new Error('Action is not defined ')
  }

  let inputs = []
  let outputs = []
  let outputsData = []
  if (action === UpdateActions.UPDATE_STATE_WITH_ISSUER || action === UpdateActions.UPDATE_STATE_WITH_CLASS) {
    const lock = await secp256k1LockScript()
    const liveCells = await getCells(lock)
    const { inputs: normalCells } = collectInputs(liveCells, NORMAL_CELL_CAPACITY)

    inputs.push(normalCells[0])

    const issuerOrClassCell = await getLiveCell(normalCells[0].previousOutput)
    outputs.push(issuerOrClassCell.output)
    outputsData.push('0x')
  }

  inputs.push({
    previousOutput: nftOutPoint,
    since: '0x0',
  })

  const nftCell = await getLiveCell(nftOutPoint)
  outputs.push(nftCell.output)
  outputs[0].capacity = `0x${(BigInt(outputs[0].capacity) - FEE).toString(16)}`

  let nft = Nft.fromString(nftCell.data.content)
  switch (action) {
    case UpdateActions.LOCK:
      nft.lock()
      break
    case UpdateActions.CLAIM:
      nft.claim()
      break
    case UpdateActions.ADD_EXT_INFO:
      nft.addExtInfo(extInfo)
      break
    case UpdateActions.UPDATE_CHARACTERISTIC:
      nft.updateCharacteristic(characteristic)
      break
    case UpdateActions.UPDATE_STATE_WITH_ISSUER:
    case UpdateActions.UPDATE_STATE_WITH_CLASS:
      nft.updateState(state)
      break
    default:
      break
  }
  outputsData.push(nft.toString())

  let cellDeps = []
  if (action == UpdateActions.UPDATE_STATE_WITH_ISSUER) {
    cellDeps.push({ outPoint: issuerOutPoint, depType: 'code' })
  } else if (action == UpdateActions.UPDATE_STATE_WITH_CLASS) {
    cellDeps.push({ outPoint: classOutPoint, depType: 'code' })
  }
  cellDeps = cellDeps.concat([await secp256k1Dep(), NFTTypeDep])

  const rawTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData,
  }
  rawTx.witnesses = rawTx.inputs.map((_, i) => (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }))
  const signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx)
  console.log(JSON.stringify(signedTx))
  const txHash = await ckb.rpc.sendTransaction(signedTx)
  console.info(`${action.toString()} nft cell tx has been sent with tx hash ${txHash}`)
  return txHash
}

const lockNftCell = async nftOutPoint => await updateNftCell(nftOutPoint, UpdateActions.LOCK)

const claimNftCell = async nftOutPoint => await updateNftCell(nftOutPoint, UpdateActions.CLAIM)

const addExtInfoToNftCell = async nftOutPoint => {
  const extInfo = '0x5678'
  return await updateNftCell(nftOutPoint, UpdateActions.ADD_EXT_INFO, { extInfo })
}

const updateNftCharacteristic = async nftOutPoint => {
  const characteristic = [1, 2, 3, 4, 5, 6, 7, 8]
  return await updateNftCell(nftOutPoint, UpdateActions.UPDATE_CHARACTERISTIC, { characteristic })
}

const updateNftStateWithIssuer = async (nftOutPoint, issuerOutPoint) => {
  const state = 0
  return await updateNftCell(nftOutPoint, UpdateActions.UPDATE_STATE_WITH_ISSUER, { state, issuerOutPoint })
}

const updateNftStateWithClass = async (nftOutPoint, classOutPoint) => {
  const state = 0
  return await updateNftCell(nftOutPoint, UpdateActions.UPDATE_STATE_WITH_CLASS, { state, classOutPoint })
}

module.exports = {
  createNftCells,
  transferNftCells,
  destroyNftCell,
  lockNftCell,
  claimNftCell,
  addExtInfoToNftCell,
  updateNftCharacteristic,
  updateNftStateWithIssuer,
  updateNftStateWithClass,
  destroyNftCellWithIssuerLock,
  destroyNftCellWithClassLock,
}
