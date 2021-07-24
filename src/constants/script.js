const FEE = BigInt(2500)

const IssuerTypeScript = {
  codeHash: '0x1474849ba9996f92941a56880ff78c0392770564414c91838db4f3a490623624',
  hashType: 'type',
  args: '',
}

const IssuerTypeDep = {
  outPoint: { txHash: '0x5654a4ec37eba62e7d7978dc1f46f7f866d926974dad136493157d7d18c357d8', index: '0x0' },
  depType: 'code',
}

const ClassTypeScript = {
  codeHash: '0xfaeecc12e2f4183fe9fe12d1d88e75b8d12a2ca4b117a490778da3cce8dee287',
  hashType: 'type',
  args: '',
}

const ClassTypeDep = {
  outPoint: { txHash: '0xeec062b8c4cab7e3df9a5a82e067b72e7ea500ebba41927e4a829cd475d73576', index: '0x0' },
  depType: 'code',
}

const NFTTypeScript = {
  codeHash: '0xf83bf4dba2c39509bf124c163d2366d8ba341f9e2fe8eaf904042bc9d9c69e4f',
  hashType: 'type',
  args: '',
}

const NFTTypeDep = {
  outPoint: { txHash: '0xc973d56919ace8dbd510a4ba45c20ace06b8d05b32d0584646122d3fe0829ed3', index: '0x0' },
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
