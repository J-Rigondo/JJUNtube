module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "linebreak-style": "off",
    "spaced-comment": "off",
    "eol-last": "off",
    "space-before-blocks": "off",
    "keyword-spacing": "off",
    "key-spacing": "off",
    "quote-props": "off",
    "no-console": "off",
    "space-in-parens": "off",
    "no-trailing-spaces": "off",
    "no-multi-spaces": "off"
  }
};
