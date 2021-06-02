const { createIssuerCell, destroyIssuerCell, updateIssuerCell } = require('../src/rpc/issuer')

const run = async () => {
  await createIssuerCell()
  // await destroyIssuerCell({
  //   txHash: '0xd2dcf173e013f40b5ab3e0a1766a166613e2c91d521e95495b878f829b9fe251',
  //   index: '0x0',
  // })
  // await updateIssuerCell({
  //   txHash: '0xa8db7e0e0bad481700b8b026259b7d6f52abea7029cda231c2d699e6e820cd5d',
  //   index: '0x0',
  // })
}

run()
