import { createIssuerCell, destroyIssuerCell, updateIssuerCell } from '../rpc/issuer'

const run = async () => {
  await createIssuerCell()
  // await destroyIssuerCell({
  //   txHash: '0xd2dcf173e013f40b5ab3e0a1766a166613e2c91d521e95495b878f829b9fe251',
  //   index: '0x0',
  // })
  // await updateIssuerCell(
  //   {
  //     txHash: '0xb6d429a60e2339a625c87790359307f0229436a602e39f0df730aaa10c80c89a',
  //     index: '0x0',
  //   },
  //   true,
  // )
}

run()
