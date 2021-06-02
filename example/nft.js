const {
  createNftCells,
  transferNftCells,
  destroyNftCell,
  lockNftCell,
  claimNftCell,
  addExtInfoToNftCell,
  destroyNftCellWithIssuerInput,
  destroyNftCellWithClassInput,
} = require('../src/rpc/nft')

const run = async () => {
  // await createNftCells('0x264c194b40040a739e973fc763f5a6b2b5a5ed6400000005', 2)
  const nftOutPoints = [
    {
      txHash: '0xa31620254cadd7a331e1213058dde19bd4fa892d288b5516fb4b55f7d2ba1e68',
      index: '0x0',
    },
    // {
    //   txHash: '0x30d8e84ce8e82665da7a63712a53c0e9812b935cb616cc562a3764f5da5ebe79',
    //   index: '0x2',
    // },
    // {
    //   txHash: '0x30d8e84ce8e82665da7a63712a53c0e9812b935cb616cc562a3764f5da5ebe79',
    //   index: '0x3',
    // },
  ]
  await transferNftCells(nftOutPoints)
  // await destroyNftCell({ txHash: '0xa31620254cadd7a331e1213058dde19bd4fa892d288b5516fb4b55f7d2ba1e68', index: '0x0' })
  // await lockNftCell({ txHash: '0xbac38d5138debec6ddb1def5160da8fff16617f157ede41f13e52cd4d0745ee6', index: '0x1' })
  // await claimNftCell({ txHash: '0x0bd97d71c9c70f40386b792fdcb0bdbdb507243d0242cd3506212018c143be4f', index: '0x2' })
  // await addExtInfoToNftCell({
  //   txHash: '0x2f31a3bbd7688a37dbaa637bdcb9a7d89db4492821c885dd5e4ff8fd56e0d7bc',
  //   index: '0x1',
  // })
  // await destroyNftCellWithIssuerInput(
  //   { txHash: '0x119921bfca0f8374d6039838d7b1658118ea94cc2a5dcef3957f442fae2fca72', index: '0x0' },
  //   {
  //     txHash: '0x8cf40a7f25f0056f5dc73dfcf3b3097fbf36505963143b7859795fb724ff3ff8',
  //     index: '0x0',
  //   },
  // )
  // await destroyNftCellWithClassInput(
  //   { txHash: '0xc17d7e9feb2a63e8bf5476c980edf6b2ffd495286eb4e07888d0d236a0139d3b', index: '0x0' },
  //   {
  //     txHash: '0xc17d7e9feb2a63e8bf5476c980edf6b2ffd495286eb4e07888d0d236a0139d3b',
  //     index: '0x1',
  //   },
  // )
}

run()
