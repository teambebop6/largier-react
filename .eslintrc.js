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
    "import/no-named-as-default": 0,
    "react/prop-types": 0,
    "no-restricted-globals": ["error", "event"],
  },
};