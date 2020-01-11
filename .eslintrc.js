module.exports = {
  env: {
    browser: true,
    es6: true,
    'react-native/react-native': true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-native/all',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native'
  ],
  rules: {
    'react-native/no-color-literals': 'off'
  },
};
