const FEE = BigInt(1600)

const IssuerTypeScript = {
  codeHash: '0x46301ca8ab5b230042de69cb40092f41ae8bb577af84cbbe7c11b1de0c11f463',
  hashType: 'type',
  args: '',
}

const IssuerTypeDep = {
  outPoint: { txHash: '0x1b95193e291d03691ddab7b38f5bac38c0193bdba074abecfb3325b31270adf1', index: '0x1' },
  depType: 'code',
}

const ClassTypeScript = {
  codeHash: '0xbf9d0a5a6032016a7efa585a6e056d11ca35f4292948e3ad897d123e8a85c037',
  hashType: 'type',
  args: '',
}

const ClassTypeDep = {
  outPoint: { txHash: '0x1b95193e291d03691ddab7b38f5bac38c0193bdba074abecfb3325b31270adf1', index: '0x0' },
  depType: 'code',
}

const NFTTypeScript = {
  codeHash: '0xdd62368ab1e5f8430c494740e90fa160bf0a95a9eaf347bc8bb74e4bf598fc14',
  hashType: 'type',
  args: '',
}

const NFTTypeDep = {
  outPoint: { txHash: '0x1b95193e291d03691ddab7b38f5bac38c0193bdba074abecfb3325b31270adf1', index: '0x2' },
  depType: 'code',
}

module.exports = {
  FEE,
  IssuerTypeScript,
  IssuerTypeDep,
  ClassTypeScript,
  ClassTypeDep,
  NFTTypeScript,
  NFTTypeDep,
}
