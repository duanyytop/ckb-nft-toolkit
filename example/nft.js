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
  // await createNftCells('0x264c194b40040a739e973fc763f5a6b2b5a5ed6400000003', 1)
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
  // await destroyNftCell({ txHash: '0x8cf40a7f25f0056f5dc73dfcf3b3097fbf36505963143b7859795fb724ff3ff8', index: '0x0' })
  // await lockNftCell({ txHash: '0xbac38d5138debec6ddb1def5160da8fff16617f157ede41f13e52cd4d0745ee6', index: '0x1' })
  // await claimNftCell({ txHash: '0x847d1da8511b7736a244a522981cd76f81caed430939375487f92c6318d06983', index: '0x1' })
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
  await destroyNftCellWithClassInput(
    { txHash: '0xc17d7e9feb2a63e8bf5476c980edf6b2ffd495286eb4e07888d0d236a0139d3b', index: '0x0' },
    {
      txHash: '0xc17d7e9feb2a63e8bf5476c980edf6b2ffd495286eb4e07888d0d236a0139d3b',
      index: '0x1',
    },
  )
}

run()
