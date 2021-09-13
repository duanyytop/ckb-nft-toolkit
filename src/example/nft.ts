import {
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
} from '../rpc/nft'

const run = async () => {
  await createNftCells('0xda72621c62aad30c0131f366330bccc9b8bc584900000001', 2)
  // const nftOutPoints = [
  //   {
  //     txHash: '0x532462b201e1712a347dbc366db1fd9dc79eb54719b9127280f4aea74ebccef0',
  //     index: '0x2',
  //   },
  // ]
  // await transferNftCells(nftOutPoints, true)
  // await destroyNftCell(
  //   { txHash: '0xf844937938829a072d369d209fb34c829f7d485c3e452c54d5bc3fe464e2ea12', index: '0x0' },
  //   true,
  // )
  // await lockNftCell({ txHash: '0xbac38d5138debec6ddb1def5160da8fff16617f157ede41f13e52cd4d0745ee6', index: '0x1' })
  // await claimNftCell(
  //   { txHash: '0xf844937938829a072d369d209fb34c829f7d485c3e452c54d5bc3fe464e2ea12', index: '0x0' },
  //   true,
  // )
  // await addExtInfoToNftCell({
  //   txHash: '0x2f31a3bbd7688a37dbaa637bdcb9a7d89db4492821c885dd5e4ff8fd56e0d7bc',
  //   index: '0x1',
  // })
  // await updateNftCharacteristic({
  //   txHash: '0x9c09f51bc4f4cc01e7c5a207524c5be1fed59aa2b1e9b96ecf75a8ab1dcf6ae5',
  //   index: '0x2',
  // })
  // await updateNftStateWithIssuer({
  //   nftOutPoint: {
  //     txHash: '0x6728ceaa8feff6866dae77d4f7ebdd3c14cae2a7baed63cfefb0d927026f07e1',
  //     index: '0x1',
  //   },
  //   issuerOutPoint: {
  //     txHash: '0x5efeb7bca93f90a38d7f60bae5db547b8122c58e6db37d00435998038fefd02a',
  //     index: '0x0',
  //   },
  // })
  // await updateNftStateWithClass({
  //   nftOutPoint: {
  //     txHash: '0x9c09f51bc4f4cc01e7c5a207524c5be1fed59aa2b1e9b96ecf75a8ab1dcf6ae5',
  //     index: '0x2',
  //   },
  //   classOutPoint: {
  //     txHash: '0x9c09f51bc4f4cc01e7c5a207524c5be1fed59aa2b1e9b96ecf75a8ab1dcf6ae5',
  //     index: '0x0',
  //   },
  // })
  // await destroyNftCellWithIssuerLock({
  //   issuerOutPoint: {
  //     txHash: '0x5efeb7bca93f90a38d7f60bae5db547b8122c58e6db37d00435998038fefd02a',
  //     index: '0x0',
  //   },
  //   nftOutPoint: { txHash: '0x6728ceaa8feff6866dae77d4f7ebdd3c14cae2a7baed63cfefb0d927026f07e1', index: '0x3' },
  // })
  // await destroyNftCellWithClassLock({
  //   classOutPoint: { txHash: '0x6728ceaa8feff6866dae77d4f7ebdd3c14cae2a7baed63cfefb0d927026f07e1', index: '0x0' },
  //   nftOutPoint: {
  //     txHash: '0x6728ceaa8feff6866dae77d4f7ebdd3c14cae2a7baed63cfefb0d927026f07e1',
  //     index: '0x4',
  //   },
  // })
}

run()
