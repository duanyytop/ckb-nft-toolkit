const { createIssuerCell } = require('../src/rpc/issuer')
const { createClassCells } = require('../src/rpc/class')
const { createNftCells, transferNftCells } = require('../src/rpc/nft')

const run = async () => {
  // await createIssuerCell()
  // await createClassCells('0xdb88adf4a6115452b05c48a400da906c0523e80b', 3)
  // await createNftCells('0xebf77f313ceed051580e4c3248db3a394adedae000000003', 3)

  const nftOutPoints = [
    {
      txHash: '0x847c0005ca51e833e71438695158002ff6b0bb9b9f7fd529b9b207502cfe2dbf',
      index: '0x1',
    },
    {
      txHash: '0x847c0005ca51e833e71438695158002ff6b0bb9b9f7fd529b9b207502cfe2dbf',
      index: '0x2',
    },
    {
      txHash: '0x847c0005ca51e833e71438695158002ff6b0bb9b9f7fd529b9b207502cfe2dbf',
      index: '0x3',
    },
  ]
  transferNftCells(nftOutPoints)
}

run()
