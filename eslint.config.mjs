// import tsParser from "@typescript-eslint/parser"
export default [
  {
    files: ["src/**/*.js", "src/**/*.ts", "src/**/*.tsx"],
    // languageOptions: {
    //   parser: tsParser
    // },
    rules: {
      semi: "error"
    }
  }
];



  //       module.exports = [{
  // "rules": {
  //   files: ["./src/**/*.js", "./src/**/*.js"],
  //   "comma-dangle": ["warn", "never"],
    // "@typescript-eslint/no-unused-vars": [
    //   "warn",
    //   {
    //     "argsIgnorePattern": "^_",
    //     "varsIgnorePattern": "^_"
    //   }
    // ],
    // "react/prop-types": 0,
    // "react/display-name": "off",
    // "@typescript-eslint/ban-ts-comment": 0,
    // "@typescript-eslint/no-empty-interface": 0,
    // "indent": ["error", "tab"],
  //   "linebreak-style": ["error", "unix"],
  //   "quotes": ["error", "double"],
  //   "semi": ["error", "always"],
  //   "arrow-parens": ["warn", "as-needed"],
  //   "no-restricted-imports": [
  //     "error", "lodash"
  //   ]
  // },
  // "plugins": [
  //   "react",
  //   "@typescript-eslint",
  //   "import-helpers"
  // ],
  // ignorePatterns: ["/*", "!/src"]
  // "extends": [
  //   "plugin:react-hooks/recommended",
  //   "eslint:recommended",
  //   "plugin:react/recommended",
  //   "plugin:@typescript-eslint/recommended"
  // ],
  // "overrides": [],
  // "parser": "@typescript-eslint/parser",
  // "parserOptions": {
  //   "ecmaVersion": "latest",
  //   "sourceType": "module"
  // }
// }];
