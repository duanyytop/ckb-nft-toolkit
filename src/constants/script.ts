export const FEE = BigInt(10000)

export const IssuerTypeScript: CKBComponents.Script = {
  codeHash: '0xb59879b6ea6fff985223117fa499ce84f8cfb028c4ffdfdf5d3ec19e905a11ed',
  hashType: 'type',
  args: '',
}
export const IssuerTypeDep: CKBComponents.CellDep = {
  outPoint: { txHash: '0x3ecf42927509645dec38667d557dd9ba20d0d07267d769983495c1b6b9c70cc4', index: '0x0' },
  depType: 'code',
}

export const ClassTypeScript: CKBComponents.Script = {
  codeHash: '0x4b488e0893b7aba6543282be74a58eee1fd8039c1b31cc2481257ad7db8259f5',
  hashType: 'type',
  args: '',
}

export const ClassTypeDep: CKBComponents.CellDep = {
  outPoint: { txHash: '0xa6fbf7e36aebf3169a39a8a8bc2462185baa6f6c0300e45cea2b0839ba540e18', index: '0x0' },
  depType: 'depGroup',
}

export const NFTTypeScript: CKBComponents.Script = {
  codeHash: '0xb1837b5ad01a88558731953062d1f5cb547adf89ece01e8934a9f0aeed2d959f',
  hashType: 'type',
  args: '',
}

export const NFTTypeDep: CKBComponents.CellDep = {
  outPoint: { txHash: '0x3ecf42927509645dec38667d557dd9ba20d0d07267d769983495c1b6b9c70cc4', index: '0x2' },
  depType: 'depGroup',
}

export const CompactNFTTypeScript: CKBComponents.Script = {
  codeHash: '0xdca728b2220d4026ae4295915ca3dfb586bdf75dab7bf14b20373899588d8689',
  hashType: 'type',
  args: '',
}

export const CompactNFTTypeDep: CKBComponents.CellDep = {
  outPoint: { txHash: '0xf61190cf09c83a5c06d932edb983cd8d8fe50ec56972e622bf96a7ce5dfc4970', index: '0x0' },
  depType: 'depGroup',
}
