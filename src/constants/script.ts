export const FEE = BigInt(2500)

export const IssuerTypeScript: CKBComponents.Script = {
  codeHash: '0xb59879b6ea6fff985223117fa499ce84f8cfb028c4ffdfdf5d3ec19e905a11ed',
  hashType: 'type',
  args: '',
}

export const IssuerTypeDep: CKBComponents.CellDep = {
  outPoint: { txHash: '0xbd262c87a84c08ea3bc141700cf55c1a285009de0e22c247a8d9597b4fc491e6', index: '0x0' },
  depType: 'code',
}

export const ClassTypeScript: CKBComponents.Script = {
  codeHash: '0xf569e7b728c21c4bcc974e58ccd7b09ad4fcc8f932368924e1f51c15a8281aaf',
  hashType: 'type',
  args: '',
}

export const ClassTypeDep: CKBComponents.CellDep = {
  outPoint: { txHash: '0x5a9a42fbc7a7a79feb750c5b8617a067d72d41a6d0fa0812d36e2cae956f103a', index: '0x0' },
  depType: 'code',
}

export const NFTTypeScript: CKBComponents.Script = {
  codeHash: '0x13e8ed98cbaff01da0e22fbcaa9337ede31c66a4caae62833edfc2f60d7aa4d0',
  hashType: 'type',
  args: '',
}

export const NFTTypeDep: CKBComponents.CellDep = {
  outPoint: { txHash: '0xd27a5ff185abe09bba64d42d43f63dd95bfe005f601958f1efe8ee46a6f1a276', index: '0x0' },
  depType: 'code',
}
