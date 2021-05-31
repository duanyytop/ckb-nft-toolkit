const { createClassCells } = require('../src/rpc/class')

const run = async () => {
  await createClassCells('0xd4066c716eb32e95cb02f33f7b1abc454d9c0361', 1)
}

run()
