module.exports = {
  "root": true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    semi: 0,
    'react-refresh/only-export-components': 'warn',
    "@typescript-eslint/no-explicit-any": 0,
    "no-explicit-any": 0,
    "@typescript-eslint/ban-ts-comment": 0
  },
}
