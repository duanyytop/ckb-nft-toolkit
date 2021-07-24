const { createClassCells, destroyClassCell, updateClassCell } = require('../src/rpc/class')

const run = async () => {
  await createClassCells('0x168e346826f0e7a9cd9d829c78e4b5fe70428d0f', 1)
  // await destroyClassCell({ txHash: '0x41f68a210199bcce1d51e80829026f529b2edd80d4b85e8b7a00f8a3c321f42c', index: '0x0' })
  // await updateClassCell({ txHash: '0x41f68a210199bcce1d51e80829026f529b2edd80d4b85e8b7a00f8a3c321f42c', index: '0x0' })
}

run()
