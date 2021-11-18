export const FEE = BigInt(10000)

export const IssuerTypeScript: CKBComponents.Script = {
  codeHash: '0xb59879b6ea6fff985223117fa499ce84f8cfb028c4ffdfdf5d3ec19e905a11ed',
  hashType: 'type',
  args: '',
}
export const IssuerTypeDep: CKBComponents.CellDep = {
  outPoint: { txHash: '0xf11ccb6079c1a4b3d86abe2c574c5db8d2fd3505fdc1d5970b69b31864a4bd1c', index: '0x0' },
  depType: 'code',
}

export const ClassTypeScript: CKBComponents.Script = {
  codeHash: '0x095b8c0b4e51a45f953acd1fcd1e39489f2675b4bc94e7af27bb38958790e3fc',
  hashType: 'type',
  args: '',
}

export const ClassTypeDep: CKBComponents.CellDep = {
  outPoint: { txHash: '0xf11ccb6079c1a4b3d86abe2c574c5db8d2fd3505fdc1d5970b69b31864a4bd1c', index: '0x1' },
  depType: 'code',
}

export const NFTTypeScript: CKBComponents.Script = {
  codeHash: '0xb1837b5ad01a88558731953062d1f5cb547adf89ece01e8934a9f0aeed2d959f',
  hashType: 'type',
  args: '',
}

export const NFTTypeDep: CKBComponents.CellDep = {
  outPoint: { txHash: '0xf11ccb6079c1a4b3d86abe2c574c5db8d2fd3505fdc1d5970b69b31864a4bd1c', index: '0x2' },
  depType: 'code',
}
