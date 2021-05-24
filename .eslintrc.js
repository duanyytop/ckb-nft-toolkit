module.exports = {
  extends: ['plugin:prettier/recommended'],
  parser: 'babel-eslint',
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js'],
      },
    },
  },
}
