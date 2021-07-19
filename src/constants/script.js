const FEE = BigInt(46000)

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
  codeHash: '0xf569e7b728c21c4bcc974e58ccd7b09ad4fcc8f932368924e1f51c15a8281aaf',
  hashType: 'type',
  args: '',
}

const ClassTypeDep = {
  outPoint: { txHash: '0x5a9a42fbc7a7a79feb750c5b8617a067d72d41a6d0fa0812d36e2cae956f103a', index: '0x0' },
  depType: 'code',
}

const NFTTypeScript = {
  codeHash: '0x13e8ed98cbaff01da0e22fbcaa9337ede31c66a4caae62833edfc2f60d7aa4d0',
  hashType: 'type',
  args: '',
}

const NFTTypeDep = {
  outPoint: { txHash: '0x4b88db39e921dde8d2fb36fe2b93c2e7dbfd2f5343ef9c3d5905a1dd827fb87d', index: '0x0' },
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
