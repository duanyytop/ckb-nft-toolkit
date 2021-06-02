const {
  createNftCells,
  transferNftCells,
  destroyNftCell,
  lockNftCell,
  claimNftCell,
  addExtInfoToNftCell,
} = require('../src/rpc/nft')

const run = async () => {
  await createNftCells('0x264c194b40040a739e973fc763f5a6b2b5a5ed6400000002', 1)
  // const nftOutPoints = [
  //   {
  //     txHash: '0x30d8e84ce8e82665da7a63712a53c0e9812b935cb616cc562a3764f5da5ebe79',
  //     index: '0x1',
  //   },
  //   {
  //     txHash: '0x30d8e84ce8e82665da7a63712a53c0e9812b935cb616cc562a3764f5da5ebe79',
  //     index: '0x2',
  //   },
  //   {
  //     txHash: '0x30d8e84ce8e82665da7a63712a53c0e9812b935cb616cc562a3764f5da5ebe79',
  //     index: '0x3',
  //   },
  // ]
  // await transferNftCells(nftOutPoints)
  // await destroyNftCell({ txHash: '0x7f2cbef7b2d5e179dbf208a367beeb4fa2123c383fe8c448aac453f21deea212', index: '0x1' })
  // await lockNftCell({ txHash: '0xbac38d5138debec6ddb1def5160da8fff16617f157ede41f13e52cd4d0745ee6', index: '0x1' })
  // await claimNftCell({ txHash: '0x81f7d60d0b401d504383d8867b3859449d9a33765624bf63ccd18783a2b40b52', index: '0x1' })
  // await addExtInfoToNftCell({
  //   txHash: '0x2f31a3bbd7688a37dbaa637bdcb9a7d89db4492821c885dd5e4ff8fd56e0d7bc',
  //   index: '0x1',
  // })
}

run()
