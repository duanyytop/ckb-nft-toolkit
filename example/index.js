const { createIssuerCell } = require('../src/rpc/issuer')
const { createClassCells } = require('../src/rpc/class')
const { createNftCells } = require('../src/rpc/nft')

const run = async () => {
  // await createIssuerCell()
  // await createClassCells('0xdb88adf4a6115452b05c48a400da906c0523e80b', 3)
  await createNftCells('0xebf77f313ceed051580e4c3248db3a394adedae000000000', 3)
}

run()
