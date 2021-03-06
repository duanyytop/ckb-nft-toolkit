require('dotenv').config()
const PRIVATE_KEY = process.env.PRIVATE_KEY || '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
const RECEIVER_ADDRESS =
  process.env.RECEIVER_ADDRESS || 'ckteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
const CKB_NODE_RPC = process.env.CKB_NODE_RPC || 'http://localhost:8114'
const CKB_NODE_INDEXER = process.env.CKB_NODE_INDEXER || 'http://localhost:8116'

export { PRIVATE_KEY, CKB_NODE_RPC, CKB_NODE_INDEXER, RECEIVER_ADDRESS }
