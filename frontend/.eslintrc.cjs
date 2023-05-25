const orderedKeys = ['children','className','_id','id','type','href', 'name', 'title'];
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
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
  ignorePatterns: ['vite.config.ts', '.eslintrc.cjs', 'tailwind.config.js'],
  plugins: [
    'react-hooks',
    '@tanstack/query',
    'sort-keys-custom-order',
    // 'simple-import-sort',
    'tailwindcss',
  ],
  rules: {
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/prefer-query-object-syntax': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'import/prefer-default-export': 'off',
    // 'simple-import-sort/imports': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    'sort-keys-custom-order/object-keys': ['error', { orderedKeys }],
    'sort-keys-custom-order/type-keys': ['error', { orderedKeys }],
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    // uncommit on developing
    'no-console': 'off',
    'no-debugger': 'off',
    'arrow-body-style': 0, // change to ["error", "always"] before build
  },
};
