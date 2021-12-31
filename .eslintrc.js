module.exports = {
  extends: [
    'oclif',
    'oclif-typescript',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/no-array-callback-reference': 'off',
  },
};
