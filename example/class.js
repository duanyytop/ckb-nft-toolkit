const { createClassCells, destroyClassCell, updateClassCell } = require('../src/rpc/class')

const run = async () => {
  await createClassCells('0xaac1f097b083e142735f679b13c347bc837e05b5', 2)
  // await destroyClassCell({ txHash: '0x41f68a210199bcce1d51e80829026f529b2edd80d4b85e8b7a00f8a3c321f42c', index: '0x0' })
  // await updateClassCell({ txHash: '0x41f68a210199bcce1d51e80829026f529b2edd80d4b85e8b7a00f8a3c321f42c', index: '0x0' })
}

run()
