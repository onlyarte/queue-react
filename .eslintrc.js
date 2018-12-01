module.exports = {
  extends: [
    './eslint/base-rules/best-practices',
    './eslint/base-rules/errors',
    './eslint/base-rules/node',
    './eslint/base-rules/style',
    './eslint/base-rules/variables',
    './eslint/base-rules/es6',
    './eslint/base-rules/imports',
    './eslint/react-rules/react-a11y',
    './eslint/react-rules/react',
  ].map(require.resolve),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    strict: 'error',
    'react/jsx-filename-extension': 'off',
  },
};
