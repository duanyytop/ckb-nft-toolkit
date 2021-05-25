const FEE = BigInt(2000)

const IssuerTypeScript = {
  codeHash: '0xb59879b6ea6fff985223117fa499ce84f8cfb028c4ffdfdf5d3ec19e905a11ed',
  hashType: 'type',
  args: '',
}

const IssuerTypeDep = {
  outPoint: { txHash: '0x744d2c4c4e6fabe66cfb08cb818532c50fffc682a7614746328c5d691a811c06', index: '0x0' },
  depType: 'code',
}

const ClassTypeScript = {
  codeHash: '0x095b8c0b4e51a45f953acd1fcd1e39489f2675b4bc94e7af27bb38958790e3fc',
  hashType: 'type',
  args: '',
}

const ClassTypeDep = {
  outPoint: { txHash: '0x4f27e40b302bcb3bf0af3deae460f46076de2b4db30c0212b14b341c20fcb330', index: '0x0' },
  depType: 'code',
}

const NFTTypeScript = {
  codeHash: '0xb1837b5ad01a88558731953062d1f5cb547adf89ece01e8934a9f0aeed2d959f',
  hashType: 'type',
  args: '',
}

const NFTTypeDep = {
  outPoint: { txHash: '0x7f9e3c1a2fc90411eb90fc2363101f6bd7b33875c3535117db5e52cd8a78b313', index: '0x0' },
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
