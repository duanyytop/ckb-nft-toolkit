export const FEE = BigInt(10000)

export const IssuerTypeScript: CKBComponents.Script = {
  codeHash: '0x24bdb240647c7e6ffffcf6e321f68c791e8eeced844f78fa96eac178ee5c630c',
  hashType: 'type',
  args: '',
}
export const IssuerTypeDep: CKBComponents.CellDep = {
  outPoint: { txHash: '0x37165393ffbb126143e39074ecf18f5b3cde4786292312fb24a9316583cd92f7', index: '0x0' },
  depType: 'code',
}

export const ClassTypeScript: CKBComponents.Script = {
  codeHash: '0x1726a9fff88031137139c8280391985377afcf66f78f0b1f76760f8725e0c05a',
  hashType: 'type',
  args: '',
}

export const ClassTypeDep: CKBComponents.CellDep = {
  outPoint: { txHash: '0x7d43d5fd63c89219457c6d0e9f82a208f0efc567e13f5be05b175cd11a83a6b8', index: '0x0' },
  depType: 'code',
}

export const NFTTypeScript: CKBComponents.Script = {
  codeHash: '0x8e04b9ad3a7d398f2f32c64c070038edeb740898311595e2e70cac77fe5d8cda',
  hashType: 'type',
  args: '',
}

export const NFTTypeDep: CKBComponents.CellDep = {
  outPoint: { txHash: '0xd2fdcd331eaf64824b123b21c8cee2d28b0859ca1a41613f15d5a044bc257b45', index: '0x0' },
  depType: 'code',
}
