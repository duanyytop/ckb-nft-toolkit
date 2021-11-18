import { createClassCells, destroyClassCell, updateClassCell } from '../rpc/class'

const run = async () => {
  await createClassCells('0x32ba5ce88abff5019397d8d683cb53d7a6c9fb74', 2)
  // await destroyClassCell({ txHash: '0x41f68a210199bcce1d51e80829026f529b2edd80d4b85e8b7a00f8a3c321f42c', index: '0x0' })
  // await updateClassCell({ txHash: '0x41f68a210199bcce1d51e80829026f529b2edd80d4b85e8b7a00f8a3c321f42c', index: '0x0' })
}

run()
