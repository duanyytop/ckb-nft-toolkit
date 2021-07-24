const {
  createNftCells,
  transferNftCells,
  destroyNftCell,
  lockNftCell,
  claimNftCell,
  addExtInfoToNftCell,
  destroyNftCellWithIssuerLock,
  destroyNftCellWithClassLock,
  updateNftCharacteristic,
  updateNftStateWithIssuer,
  updateNftStateWithClass,
} = require('../src/rpc/nft')

const run = async () => {
  await createNftCells('0x8d060ce9dd47c7b005d0bebf9a82d1e00ed2979100000001', 80)
  // const nftOutPoints = [
  //   {
  //     txHash: '0xcd99a4b19a945a78c1d84f1bc47a0667e7cb7dbdbc01703196a0de65ba0b69d2',
  //     index: '0x1',
  //   },
  // ]
  // await transferNftCells(nftOutPoints)
  // await destroyNftCell({ txHash: '0xa31620254cadd7a331e1213058dde19bd4fa892d288b5516fb4b55f7d2ba1e68', index: '0x0' })
  // await lockNftCell({ txHash: '0xbac38d5138debec6ddb1def5160da8fff16617f157ede41f13e52cd4d0745ee6', index: '0x1' })
  // await claimNftCell({ txHash: '0x0bd97d71c9c70f40386b792fdcb0bdbdb507243d0242cd3506212018c143be4f', index: '0x2' })
  // await addExtInfoToNftCell({
  //   txHash: '0x2f31a3bbd7688a37dbaa637bdcb9a7d89db4492821c885dd5e4ff8fd56e0d7bc',
  //   index: '0x1',
  // })
  // await updateNftCharacteristic({
  //   txHash: '0x974778d1f624c26d3f0d9af31bfff04acbab3c0054046f37e32c7118c88d3e17',
  //   index: '0x1',
  // })
  // await updateNftStateWithIssuer(
  //   {
  //     txHash: '0x4abdb93c63425379760cc1e9893df3728eb7bcb001a6add996a91c37ea25537c',
  //     index: '0x1',
  //   },
  //   {
  //     txHash: '0xbea940dd1b9a0ec23eab61ccf0fc28bcbdcca581b121d50f691d9bf1518c0020',
  //     index: '0x0',
  //   },
  // )
  // await updateNftStateWithClass(
  //   {
  //     txHash: '0x4abdb93c63425379760cc1e9893df3728eb7bcb001a6add996a91c37ea25537c',
  //     index: '0x2',
  //   },
  //   {
  //     txHash: '0x4abdb93c63425379760cc1e9893df3728eb7bcb001a6add996a91c37ea25537c',
  //     index: '0x0',
  //   },
  // )
  // await destroyNftCellWithIssuerLock(
  //   { txHash: '0x1079ea9f1099c0ac38cf40d66393a7fcacd647c0903d9dbd32b92e29d8eaec1e', index: '0x0' },
  //   {
  //     txHash: '0x616ef5d3eb547cd599c5f28434c2defbf530a6b2bdac44f184e851c5277b760d',
  //     index: '0x1',
  //   },
  // )
  // await destroyNftCellWithClassLock(
  //   { txHash: '0x616ef5d3eb547cd599c5f28434c2defbf530a6b2bdac44f184e851c5277b760d', index: '0x0' },
  //   {
  //     txHash: '0x616ef5d3eb547cd599c5f28434c2defbf530a6b2bdac44f184e851c5277b760d',
  //     index: '0x2',
  //   },
  // )
}

run()
