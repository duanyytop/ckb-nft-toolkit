const CKB = require('@nervosnetwork/ckb-sdk-core').default
const { CKB_NODE_RPC, PRIVATE_KEY } = require('../utils/config')

const ckb = new CKB(CKB_NODE_RPC)

const secp256k1LockScript = async () => {
  const secp256k1Dep = (await ckb.loadDeps()).secp256k1Dep
  return {
    codeHash: secp256k1Dep.codeHash,
    hashType: secp256k1Dep.hashType,
    args: generateLockArgs(),
  }
}

const generateLockArgs = () => {
  const pubKey = ckb.utils.privateKeyToPublicKey(PRIVATE_KEY)
  return '0x' + ckb.utils.blake160(pubKey, 'hex')
}

const secp256k1Dep = async () => {
  const secp256k1Dep = (await ckb.loadDeps()).secp256k1Dep
  return { outPoint: secp256k1Dep.outPoint, depType: 'depGroup' }
}

module.exports = {
  generateLockArgs,
  secp256k1LockScript,
  secp256k1Dep,
}
