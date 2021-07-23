require('dotenv').config();
var PRIVATE_KEY = process.env.PRIVATE_KEY || '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
var RECEIVER_PRIVATE_KEY = process.env.RECEIVER_PRIVATE_KEY || '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
var CKB_NODE_RPC = process.env.CKB_NODE_RPC || 'http://localhost:8114';
var CKB_NODE_INDEXER = process.env.CKB_NODE_INDEXER || 'http://localhost:8116';
export { PRIVATE_KEY, CKB_NODE_RPC, CKB_NODE_INDEXER, RECEIVER_PRIVATE_KEY };
//# sourceMappingURL=config.js.map