module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "ignorePatterns": ["*.js"],
  "plugins": [
    "react",
    "@typescript-eslint",
    "import-helpers"
  ],
  "extends": [
    "plugin:react-hooks/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "comma-dangle": ["warn", "never"],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "react/prop-types": 0,
    "react/display-name": "off",
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "arrow-parens": ["warn", "as-needed"],
    "import-helpers/order-imports": [
      "warn", {
        groups: [
          ["/^react$/", "/^react-dom$/"],
          ["/^react-native$/"],
          ["/^@/"],
          ["index", "sibling", "parent"],
          ["/.module.scss$/"]
        ]
      }],
    "no-restricted-imports": [
      "error", "lodash"
    ]
  }
};
