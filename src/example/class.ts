import { createClassCells, destroyClassCell, updateClassCell, updateClassCellToMintCompactNFT } from '../rpc/class'

const run = async () => {
  // await createClassCells('0x32ba5ce88abff5019397d8d683cb53d7a6c9fb74', 1)
  // await destroyClassCell({ txHash: '0x41f68a210199bcce1d51e80829026f529b2edd80d4b85e8b7a00f8a3c321f42c', index: '0x0' })
  // await updateClassCell({ txHash: '0x41f68a210199bcce1d51e80829026f529b2edd80d4b85e8b7a00f8a3c321f42c', index: '0x0' })
  await updateClassCellToMintCompactNFT({
    txHash: '0xee4dd29811599e63f203d78012c43920b9d353621acb19a253cc8e49078ab988',
    index: '0x1',
  })
}

run()
