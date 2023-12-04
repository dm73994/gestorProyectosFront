module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": 1,
    // '@typescript-eslint/no-explicit-any': 'error',
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
  },
}
