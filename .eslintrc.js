module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // turn on errors for missing imports
    'import/no-unresolved': 'error',
    /*
     * "import/order" sorts the order of import declarations, ie:
     *
     * import b from "b";
     * import { z, a } from "x";
     */
    'import/order': [
      'warn',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: [
          ['external', 'builtin'],
          ['internal'],
          ['index', 'sibling', 'parent'],
        ],
        'newlines-between': 'always',
      },
    ],
    /*
     * Then, "sort-imports" complements "import/order" by sorting named imports,
     * like so:
     *
     * import b from "b";
     * import { a, z } from "x";
     */
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        /*
         * This option turns off declaration sorting, as this is already handled
         * by "import/order".
         */
        ignoreDeclarationSort: true,
      },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
      node: true,
    },
    'import/ignore': ['joi'], // Joi has a namespace that hasn't export his methods so we need to ignore it to prevent false eslint errors. https://github.com/import-js/eslint-plugin-import/blob/v2.28.0/docs/rules/namespace.md
  },
};
