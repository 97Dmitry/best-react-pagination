module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  plugins: ["@typescript-eslint", "react"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      tsconfigRootDir: __dirname,
      project: ["./tsconfig.json"],
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
};
