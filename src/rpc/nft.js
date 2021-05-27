const CKB = require('@nervosnetwork/ckb-sdk-core').default
const { secp256k1LockScript, secp256k1Dep, receiverSecp256k1Lock } = require('../account')
const { getCells, collectInputs, getLiveCell } = require('../collector')
const { FEE, NFTTypeScript, ClassTypeScript, ClassTypeDep, NFTTypeDep } = require('../utils/const')
const { CKB_NODE_RPC, PRIVATE_KEY } = require('../utils/config')
const { u32ToBe } = require('../utils/hex')
const { TokenClass } = require('../models/class')
const { Nft } = require('../models/nft')

const ckb = new CKB(CKB_NODE_RPC)
const NFT_CELL_CAPACITY = BigInt(134) * BigInt(100000000)

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
  const nft = new Nft(0, [0, 0, 0, 0, 0, 0, 0, 0, 0], 0, 0, '').toString()
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

module.exports = {
  createNftCells,
  transferNftCells,
  destroyNftCell,
}
