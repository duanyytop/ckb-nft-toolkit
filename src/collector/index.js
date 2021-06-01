const fetch = require('node-fetch')
const CKB = require('@nervosnetwork/ckb-sdk-core').default
const { CKB_NODE_RPC, CKB_NODE_INDEXER } = require('../utils/config')
const { FEE } = require('../constants/script')

const ckb = new CKB(CKB_NODE_RPC)

const getCells = async (lock, type = null) => {
  const filter = type
    ? {
        script: {
          code_hash: type.codeHash,
          hash_type: type.hashType,
          args: type.args,
        },
      }
    : {
        output_data_len_range: ['0x0', '0x1'],
      }
  let payload = {
    id: 1,
    jsonrpc: '2.0',
    method: 'get_cells',
    params: [
      {
        script: {
          code_hash: lock.codeHash,
          hash_type: lock.hashType,
          args: lock.args,
        },
        script_type: 'lock',
        filter,
      },
      'asc',
      '0x64',
    ],
  }
  const body = JSON.stringify(payload, null, '  ')
  try {
    let res = await fetch(CKB_NODE_INDEXER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
    res = await res.json()
    return res.result.objects
  } catch (error) {
    console.error('error', error)
  }
}

const collectInputs = (liveCells, needCapacity) => {
  let inputs = []
  let sum = BigInt(0)
  for (let cell of liveCells) {
    inputs.push({
      previousOutput: {
        txHash: cell.out_point.tx_hash,
        index: cell.out_point.index,
      },
      since: '0x0',
    })
    sum = sum + BigInt(cell.output.capacity)
    if (sum >= needCapacity + FEE) {
      break
    }
  }
  if (sum < needCapacity + FEE) {
    throw Error('Capacity not enough')
  }
  return { inputs, capacity: sum }
}

const getLiveCell = async outPoint => {
  const { cell } = await ckb.rpc.getLiveCell(outPoint, true)
  return cell
}

module.exports = {
  getCells,
  collectInputs,
  getLiveCell,
}
