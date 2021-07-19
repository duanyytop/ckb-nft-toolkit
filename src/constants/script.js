const FEE = BigInt(1600)

const IssuerTypeScript = {
  codeHash: '0xb59879b6ea6fff985223117fa499ce84f8cfb028c4ffdfdf5d3ec19e905a11ed',
  hashType: 'type',
  args: '',
}

const IssuerTypeDep = {
  outPoint: { txHash: '0xbd262c87a84c08ea3bc141700cf55c1a285009de0e22c247a8d9597b4fc491e6', index: '0x0' },
  depType: 'code',
}

const ClassTypeScript = {
  codeHash: '0x095b8c0b4e51a45f953acd1fcd1e39489f2675b4bc94e7af27bb38958790e3fc',
  hashType: 'type',
  args: '',
}

const ClassTypeDep = {
  outPoint: { txHash: '0xbd262c87a84c08ea3bc141700cf55c1a285009de0e22c247a8d9597b4fc491e6', index: '0x1' },
  depType: 'code',
}

const NFTTypeScript = {
  codeHash: '0xb1837b5ad01a88558731953062d1f5cb547adf89ece01e8934a9f0aeed2d959f',
  hashType: 'type',
  args: '',
}

const NFTTypeDep = {
  outPoint: { txHash: '0xbd262c87a84c08ea3bc141700cf55c1a285009de0e22c247a8d9597b4fc491e6', index: '0x2' },
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
