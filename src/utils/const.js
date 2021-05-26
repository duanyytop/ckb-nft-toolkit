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
  codeHash: '0xd7ba1fbc20f5611e11a9e883bbc9abede84f614aae411b7157284d7ff4f22b0d',
  hashType: 'type',
  args: '',
}

const ClassTypeDep = {
  outPoint: { txHash: '0x3b9f7c048ecbd15c90638e816b9980113127b6ac9eb2b75e822dfb3ada8ede78', index: '0x0' },
  depType: 'code',
}

const NFTTypeScript = {
  codeHash: '0xab3df8e57d9b2afd107195d67ad98a3412b542f2be5c7456863600749f85e8e5',
  hashType: 'type',
  args: '',
}

const NFTTypeDep = {
  outPoint: { txHash: '0x18c0415a211e11a2611c7dcdde7ee13b643e468760115eeb35f6ee44501c66e8', index: '0x0' },
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
