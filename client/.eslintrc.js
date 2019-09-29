module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
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
    'prettier'
  ],
  rules: {
    "linebreak-style": "off",
    "no-unused-vars": "warn",
    "react/jsx-filename-extension": "off",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "react/self-closing-comp": "off",
  },
};
