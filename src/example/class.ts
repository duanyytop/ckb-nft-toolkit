import { createClassCells, destroyClassCell, updateClassCell } from '../rpc/class'

const run = async () => {
  await createClassCells('0x8e07875a5b26aba8939945b5f1bfdc985d9a12e8', 1)
  // await destroyClassCell({ txHash: '0x41f68a210199bcce1d51e80829026f529b2edd80d4b85e8b7a00f8a3c321f42c', index: '0x0' })
  // await updateClassCell({ txHash: '0x41f68a210199bcce1d51e80829026f529b2edd80d4b85e8b7a00f8a3c321f42c', index: '0x0' })
}

run()
