module.exports = {
  extends: [
    'airbnb-typescript',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: ['prettier'],
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'import/no-extraneous-dependencies': 'off',
  },
};
