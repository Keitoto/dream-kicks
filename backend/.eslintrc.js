module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['sort-keys-custom-order', 'simple-import-sort'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'import/prefer-default-export': 'off',
    'simple-import-sort/imports': 'error',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    'sort-keys-custom-order/type-keys': [
      'error',
      { orderedKeys: ['id', 'name', 'title'] },
    ],
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    // uncommit on developing
    'no-console': 'off',
    'no-debugger': 'off',
    'arrow-body-style': 0, // change to ["error", "always"] before build
  },
};
