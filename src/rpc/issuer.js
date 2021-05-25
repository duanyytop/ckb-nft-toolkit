const CKB = require('@nervosnetwork/ckb-sdk-core').default
const { serializeInput, blake2b, hexToBytes } = require('@nervosnetwork/ckb-sdk-utils')
const { secp256k1LockScript, secp256k1Dep } = require('../account')
const { getCells, collectInputs } = require('../collector')
const { FEE, IssuerTypeScript, IssuerTypeDep } = require('../utils/const')
const { CKB_NODE_RPC, PRIVATE_KEY } = require('../utils/config')
const { u64ToLe } = require('../utils/hex')
const { Issuer } = require('../models/issuer')

const ckb = new CKB(CKB_NODE_RPC)
const ISSUER_CELL_CAPACITY = BigInt(150) * BigInt(100000000)
const PERSONAL = new Uint8Array([99, 107, 98, 45, 100, 101, 102, 97, 117, 108, 116, 45, 104, 97, 115, 104])

const generateIssuerTypeArgs = (firstInput, firstOutputIndex) => {
  const input = hexToBytes(serializeInput(firstInput))
  const s = blake2b(32, null, null, PERSONAL)
  s.update(input)
  s.update(hexToBytes(`0x${u64ToLe(firstOutputIndex)}`))
  return `0x${s.digest('hex').slice(0, 40)}`
}

const generateIssuerOutputs = async (inputCapacity, issuerType) => {
  const lock = await secp256k1LockScript()
  let outputs = [
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

const createIssuerCell = async () => {
  const lock = await secp256k1LockScript()
  const liveCells = await getCells(lock)
  const { inputs, capacity } = collectInputs(liveCells, ISSUER_CELL_CAPACITY)
  const issuerTypeArgs = generateIssuerTypeArgs(inputs[0], BigInt(0))
  const outputs = await generateIssuerOutputs(capacity, { ...IssuerTypeScript, args: issuerTypeArgs })
  const cellDeps = [await secp256k1Dep(), IssuerTypeDep]
  const issuer = new Issuer(0, 0, 0, '')
  const rawTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData: [issuer.toString(), '0x'],
  }
  rawTx.witnesses = rawTx.inputs.map((_, i) => (i > 0 ? '0x' : { lock: '', inputType: '', outputType: '' }))
  const signedTx = ckb.signTransaction(PRIVATE_KEY)(rawTx)
  console.info(JSON.stringify(signedTx))
  const txHash = await ckb.rpc.sendTransaction(signedTx)
  console.info(`Creating issuer cell tx has been sent with tx hash ${txHash}`)
  return txHash
}

module.exports = {
  createIssuerCell,
}
