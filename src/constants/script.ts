export const FEE = BigInt(25000)

export const IssuerTypeScript: CKBComponents.Script = {
  codeHash: '0xb59879b6ea6fff985223117fa499ce84f8cfb028c4ffdfdf5d3ec19e905a11ed',
  hashType: 'type',
  args: '',
}
export const IssuerTypeDep: CKBComponents.CellDep = {
  outPoint: { txHash: '0x194a0f84de41d006a07ece07c96a8130100818599fcf0b2ecf49e512b873ed6e', index: '0x0' },
  depType: 'code',
}

export const ClassTypeScript: CKBComponents.Script = {
  codeHash: '0x095b8c0b4e51a45f953acd1fcd1e39489f2675b4bc94e7af27bb38958790e3fc',
  hashType: 'type',
  args: '',
}

export const ClassTypeDep: CKBComponents.CellDep = {
  outPoint: { txHash: '0x194a0f84de41d006a07ece07c96a8130100818599fcf0b2ecf49e512b873ed6e', index: '0x1' },
  depType: 'code',
}

export const NFTTypeScript: CKBComponents.Script = {
  codeHash: '0xb1837b5ad01a88558731953062d1f5cb547adf89ece01e8934a9f0aeed2d959f',
  hashType: 'type',
  args: '',
}

export const NFTTypeDep: CKBComponents.CellDep = {
  outPoint: { txHash: '0x194a0f84de41d006a07ece07c96a8130100818599fcf0b2ecf49e512b873ed6e', index: '0x2' },
  depType: 'code',
}
