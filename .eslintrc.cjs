/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "@djthoms/eslint-config",
    "@djthoms/eslint-config/typescript",
    "@djthoms/eslint-config/react",
    "@djthoms/eslint-config/react-typescript",
    "@djthoms/eslint-config/vitest",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "warn"
  },
};
