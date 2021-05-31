const CKB = require('@nervosnetwork/ckb-sdk-core').default
const { scriptToHash } = require('@nervosnetwork/ckb-sdk-utils')
const { secp256k1LockScript, secp256k1Dep } = require('../account')
const { getCells, collectInputs, getLiveCell } = require('../collector')
const { FEE, IssuerTypeScript, ClassTypeScript, IssuerTypeDep, ClassTypeDep } = require('../utils/const')
const { CKB_NODE_RPC, PRIVATE_KEY } = require('../utils/config')
const { u32ToBe, utf8ToHex, remove0x } = require('../utils/hex')
const { Issuer } = require('../models/issuer')
const { TokenClass } = require('../models/class')

const ckb = new CKB(CKB_NODE_RPC)
const CLASS_CELL_CAPACITY = BigInt(240) * BigInt(100000000)

const generateClassOutputs = async (inputCapacity, classTypeScripts) => {
  const lock = await secp256k1LockScript()
  let outputs = classTypeScripts.map(classTypeScript => ({
    capacity: `0x${CLASS_CELL_CAPACITY.toString(16)}`,
    lock,
    type: classTypeScript,
  }))
  const changeCapacity = inputCapacity - FEE - CLASS_CELL_CAPACITY * BigInt(classTypeScripts.length)
  outputs.push({
    capacity: `0x${changeCapacity.toString(16)}`,
    lock,
  })
  return outputs
}

const createClassCells = async (issuerTypeArgs, classCount = 1) => {
  const lock = await secp256k1LockScript()
  const liveCells = await getCells(lock)
  const { inputs, capacity } = collectInputs(liveCells, CLASS_CELL_CAPACITY * BigInt(classCount))

  const issuerType = { ...IssuerTypeScript, args: issuerTypeArgs }
  const issuerCells = await getCells(lock, issuerType)
  const issuerOutPoint = { txHash: issuerCells[0].out_point.tx_hash, index: issuerCells[0].out_point.index }
  const issuerInput = {
    previousOutput: issuerOutPoint,
    since: '0x0',
  }

  const issuerCell = await getLiveCell(issuerOutPoint)
  const issuer = Issuer.fromString(issuerCell.data.content)
  const issuerOutput = issuerCell.output
  let classTypeScripts = []
  let tokenClasses = []
  const tokenClass = new TokenClass(
    0,
    100,
    0,
    2,
    utf8ToHex('First NFT'),
    utf8ToHex('Description'),
    utf8ToHex('https://goldenlegend.oss-cn-hangzhou.aliyuncs.com/production/1620983974245.jpeg'),
  ).toString()
  const issuerId = remove0x(scriptToHash(issuerType)).slice(0, 40)
  for (let i = 0; i < classCount; i++) {
    classTypeScripts.push({
      ...ClassTypeScript,
      args: `0x${issuerId}${u32ToBe(issuer.classCount + i)}`,
    })
    tokenClasses.push(tokenClass)
  }

  const outputIssuer = Issuer.fromString(issuerCell.data.content)
  outputIssuer.updateClassCount(issuer.classCount + classCount)

  const outputs = await generateClassOutputs(capacity, classTypeScripts)
  const cellDeps = [await secp256k1Dep(), IssuerTypeDep, ClassTypeDep]

  const rawTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs: [issuerInput, ...inputs],
    outputs: [issuerOutput, ...outputs],
    outputsData: [outputIssuer.toString(), ...tokenClasses, '0x'],
  }
  rawTx.witnesses = rawTx.inputs.map((_, i) => (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }))
  const signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx)
  console.log(JSON.stringify(signedTx))
  const txHash = await ckb.rpc.sendTransaction(signedTx)
  console.info(`Creating class cells tx has been sent with tx hash ${txHash}`)
  return txHash
}

module.exports = {
  createClassCells,
}
