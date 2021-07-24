import CKB from '@nervosnetwork/ckb-sdk-core'
import { CKB_NODE_RPC, PRIVATE_KEY, RECEIVER_PRIVATE_KEY } from '../utils/config'

const ckb = new CKB(CKB_NODE_RPC)

export const secp256k1LockScript = async (): Promise<CKBComponents.Script> => {
  const secp256k1Dep = (await ckb.loadDeps()).secp256k1Dep
  return {
    codeHash: secp256k1Dep.codeHash,
    hashType: secp256k1Dep.hashType,
    args: generateLockArgs(PRIVATE_KEY),
  }
}

export const generateLockArgs = (privateKey: Hex) => {
  const pubKey = ckb.utils.privateKeyToPublicKey(privateKey)
  return '0x' + ckb.utils.blake160(pubKey, 'hex')
}

export const secp256k1Dep = async (): Promise<CKBComponents.CellDep> => {
  const secp256k1Dep = (await ckb.loadDeps()).secp256k1Dep
  return { outPoint: secp256k1Dep.outPoint, depType: 'depGroup' }
}

export const receiverSecp256k1Lock = async (): Promise<CKBComponents.Script> => {
  const secp256k1Dep = (await ckb.loadDeps()).secp256k1Dep
  return {
    codeHash: secp256k1Dep.codeHash,
    hashType: secp256k1Dep.hashType,
    args: generateLockArgs(RECEIVER_PRIVATE_KEY),
  }
}
