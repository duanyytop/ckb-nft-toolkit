import CKB from '@nervosnetwork/ckb-sdk-core'
import { scriptToHash } from '@nervosnetwork/ckb-sdk-utils'
import { secp256k1LockScript, secp256k1Dep } from '../account'
import { getCells, collectInputs, getLiveCell } from '../collector'
import { FEE, IssuerTypeScript, ClassTypeScript, IssuerTypeDep, ClassTypeDep } from '../constants/script'
import { CKB_NODE_RPC, PRIVATE_KEY } from '../utils/config'
import { u32ToBe, utf8ToHex, remove0x } from '../utils/hex'
import Issuer from '../models/issuer'
import TokenClass from '../models/class'

const ckb = new CKB(CKB_NODE_RPC)
const CLASS_CELL_CAPACITY = BigInt(240) * BigInt(100000000)

export const generateClassOutputs = async (inputCapacity: bigint, classTypeScripts) => {
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

export const createClassCells = async (issuerTypeArgs: Hex, classCount = 1) => {
  const lock = await secp256k1LockScript()
  const liveCells = await getCells(lock)
  const { inputs, capacity } = collectInputs(liveCells, CLASS_CELL_CAPACITY * BigInt(classCount))

  const issuerType = { ...IssuerTypeScript, args: issuerTypeArgs }
  const issuerCells = await getCells(lock, issuerType)
  const issuerOutPoint = { txHash: issuerCells[0].outPoint.txHash, index: issuerCells[0].outPoint.index }
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
    1000,
    0,
    0,
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
    witnesses: [],
  }
  rawTx.witnesses = rawTx.inputs.map((_, i) => (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }))
  const signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx)
  console.log(JSON.stringify(signedTx))
  const txHash = await ckb.rpc.sendTransaction(signedTx)
  console.info(`Creating class cells tx has been sent with tx hash ${txHash}`)
  return txHash
}

export const destroyClassCell = async classOutPoint => {
  const inputs = [
    {
      previousOutput: classOutPoint,
      since: '0x0',
    },
  ]
  const classCell = await getLiveCell(classOutPoint)
  const output = classCell.output
  output.capacity = `0x${(BigInt(output.capacity) - FEE).toString(16)}`
  output.type = null
  const outputs = [output]
  const outputsData = ['0x']

  const cellDeps = [await secp256k1Dep(), ClassTypeDep]

  const rawTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData,
    witnesses: [],
  }
  rawTx.witnesses = rawTx.inputs.map((_, i) => (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }))
  const signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx)
  console.log(JSON.stringify(signedTx))
  const txHash = await ckb.rpc.sendTransaction(signedTx)
  console.info(`Destroy class cell tx has been sent with tx hash ${txHash}`)
  return txHash
}

export const updateClassCell = async classOutPoint => {
  const inputs = [
    {
      previousOutput: classOutPoint,
      since: '0x0',
    },
  ]

  const classCell = await getLiveCell(classOutPoint)
  const outputs = [classCell.output]
  outputs[0].capacity = `0x${(BigInt(outputs[0].capacity) - FEE).toString(16)}`

  let tokenClass = TokenClass.fromString(classCell.data.content)
  tokenClass.updateName(utf8ToHex('Second NFT'))
  let outputsData = [tokenClass.toString()]

  const cellDeps = [await secp256k1Dep(), ClassTypeDep]

  const rawTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData,
    witnesses: [],
  }
  rawTx.witnesses = rawTx.inputs.map((_, i) => (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }))
  const signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx)
  console.log(JSON.stringify(signedTx))
  const txHash = await ckb.rpc.sendTransaction(signedTx)
  console.info(`Update class cell tx has been sent with tx hash ${txHash}`)
  return txHash
}
