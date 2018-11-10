export = api => {
  api.cache(true)
  return {
    presets: ['next/babel', '@zeit/next-typescript/babel'],
    plugins: [
      '@babel/proposal-class-properties',
      '@babel/proposal-object-rest-spread',
    ],
  }
}
