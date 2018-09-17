module.exports = {
  //need babel-eslint to allow class static props
  "parser": "babel-eslint",
  "extends": ["eslint:recommended"],
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "globals": {
    //unit tests
    "expect": true,
    "shallow": true,
    "render": true,
    "mount": true,
    "beforeAll": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "rules": {
    //general
    "indent": ["error", 2],
    "no-var": 1,
    "prefer-arrow-callback": ["error", {}],
    "quotes": ["error", "single"],
    "semi": ["warn", "always"],
    "no-console": ["warn", {allow: ["warn", "error"]}],
  }
};