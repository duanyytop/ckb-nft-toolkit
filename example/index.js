const { createIssuerCell } = require('../src/rpc/issuer')
const { createClassCells } = require('../src/rpc/class')

const run = async () => {
  // await createIssuerCell()
  await createClassCells('0xdb88adf4a6115452b05c48a400da906c0523e80b', 3)
}

run()
