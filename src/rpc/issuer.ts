import CKB from '@nervosnetwork/ckb-sdk-core'
import { serializeInput, blake2b, hexToBytes } from '@nervosnetwork/ckb-sdk-utils'
import { secp256k1LockScript, secp256k1Dep, alwaysSuccessLock, alwaysSuccessCellDep } from '../account'
import { getCells, collectInputs, getLiveCell } from '../collector'
import { FEE, IssuerTypeScript, IssuerTypeDep } from '../constants/script'
import { CKB_NODE_RPC, PRIVATE_KEY } from '../utils/config'
import { u64ToLe } from '../utils/hex'
import Issuer from '../models/issuer'

const ckb = new CKB(CKB_NODE_RPC)
const ISSUER_CELL_CAPACITY = BigInt(150) * BigInt(100000000)
const PERSONAL = new Uint8Array([99, 107, 98, 45, 100, 101, 102, 97, 117, 108, 116, 45, 104, 97, 115, 104])

const generateIssuerTypeArgs = (firstInput: CKBComponents.CellInput, firstOutputIndex: bigint) => {
  const input = hexToBytes(serializeInput(firstInput))
  const s = blake2b(32, null, null, PERSONAL)
  s.update(input)
  s.update(hexToBytes(`0x${u64ToLe(firstOutputIndex)}`))
  return `0x${s.digest('hex').slice(0, 40)}`
}

const generateIssuerOutputs = async (
  inputCapacity: bigint,
  issuerType: CKBComponents.Script,
  isAlwaysSuccessLock = false,
) => {
  const lock = isAlwaysSuccessLock ? alwaysSuccessLock() : await secp256k1LockScript()
  let outputs: CKBComponents.CellOutput[] = [
    {
      capacity: `0x${ISSUER_CELL_CAPACITY.toString(16)}`,
      lock,
      type: issuerType,
    },
  ]
  const changeCapacity = inputCapacity - FEE - ISSUER_CELL_CAPACITY
  outputs.push({
    capacity: `0x${changeCapacity.toString(16)}`,
    lock,
  })
  return outputs
}

export const createIssuerCell = async (isAlwaysSuccessLock = false) => {
  const lock = isAlwaysSuccessLock ? alwaysSuccessLock() : await secp256k1LockScript()
  const liveCells = await getCells(lock)
  const { inputs, capacity } = collectInputs(liveCells, ISSUER_CELL_CAPACITY)
  const issuerTypeArgs = generateIssuerTypeArgs(inputs[0], BigInt(0))
  const outputs = await generateIssuerOutputs(
    capacity,
    { ...IssuerTypeScript, args: issuerTypeArgs },
    isAlwaysSuccessLock,
  )
  const cellDeps = [isAlwaysSuccessLock ? alwaysSuccessCellDep() : await secp256k1Dep(), IssuerTypeDep]
  const issuer = Issuer.fromProps({ version: 0, classCount: 0, setCount: 0, info: '' })
  const rawTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData: [issuer.toString(), '0x'],
    witnesses: [],
  }
  let txHash = ''
  if (isAlwaysSuccessLock) {
    rawTx.witnesses = rawTx.inputs.map(() => '0x')
    txHash = await ckb.rpc.sendTransaction(rawTx)
  } else {
    rawTx.witnesses = rawTx.inputs.map((_, i) => (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }))
    const signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx)
    console.info(JSON.stringify(signedTx))
    txHash = await ckb.rpc.sendTransaction(signedTx)
  }
  console.info(`Creating issuer cell tx has been sent with tx hash ${txHash}`)
  return txHash
}

export const destroyIssuerCell = async issuerOutPoint => {
  const inputs = [
    {
      previousOutput: issuerOutPoint,
      since: '0x0',
    },
  ]
  const issuerCell = await getLiveCell(issuerOutPoint)
  const output = issuerCell.output
  output.capacity = `0x${(BigInt(output.capacity) - FEE).toString(16)}`
  output.type = null
  const outputs = [output]
  const outputsData = ['0x']

  const cellDeps = [await secp256k1Dep(), IssuerTypeDep]

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
  console.info(`Destroy issuer cell tx has been sent with tx hash ${txHash}`)
  return txHash
}

export const updateIssuerCell = async (issuerOutPoint, isAlwaysSuccessLock = false) => {
  const inputs = [
    {
      previousOutput: issuerOutPoint,
      since: '0x0',
    },
  ]

  const issuerCell = await getLiveCell(issuerOutPoint)
  const outputs = [issuerCell.output]
  outputs[0].capacity = `0x${(BigInt(outputs[0].capacity) - FEE).toString(16)}`

  let issuer = Issuer.fromString(issuerCell.data.content)
  issuer.updateInfo('0x1234')
  let outputsData = [issuer.toString()]

  const cellDeps = [isAlwaysSuccessLock ? alwaysSuccessCellDep() : await secp256k1Dep(), IssuerTypeDep]

  const rawTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData,
    witnesses: [],
  }
  let txHash = ''
  if (isAlwaysSuccessLock) {
    rawTx.witnesses = rawTx.inputs.map(() => '0x')
    txHash = await ckb.rpc.sendTransaction(rawTx)
  } else {
    rawTx.witnesses = rawTx.inputs.map((_, i) => (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }))
    const signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx)
    txHash = await ckb.rpc.sendTransaction(signedTx)
  }
  console.info(`Update issuer cell tx has been sent with tx hash ${txHash}`)
  return txHash
}
