module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "no-console": 0,
    "no-underscore-dangle": 0,
    "no-param-reassign": [
      "error", {
        "props": false,
      },
    ],
    "prefer-destructuring": [
      "error", {
        "array": false,
        "object": true,
      }, {
        "enforceForRenamedProperties": false,
      }
    ],
    "no-restricted-globals": ["error", "event"],
  },
};