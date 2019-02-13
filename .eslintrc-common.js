module.exports = {
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:jasmine/recommended',
    'prettier',
    'prettier/react',
    'prettier/standard',
  ],
  plugins: ['react', 'jsx-a11y', 'jest', 'prettier', 'standard', 'jasmine', 'babel'],
  env: {
    es6: true,
    node: true,
    'jest/globals': true,
    jasmine: true,
  },
  rules: {
    'babel/no-invalid-this': 1,
    'consistent-return': [2],
    'dot-notation': [2],
    'func-names': [2],
    'func-style': [2, 'declaration', {
      'allowArrowFunctions': true
    }],
    'jsx-a11y/label-has-for': [
      'error',
      {
        components: ['label'],
        required: {
          some: ['nesting', 'id'],
        },
        allowChildren: true,
      },
    ],
    'jasmine/new-line-before-expect': 0,
    'jasmine/new-line-between-declarations': 2,
    'jasmine/no-spec-dupes': [2, 'branch'],
    'jasmine/no-suite-dupes': [2, 'branch'],
    'linebreak-style': [2, 'unix'],
    'no-alert': [2],
    'no-console': [2],
    'no-implicit-coercion': [2],
    'no-lonely-if': [2],
    'no-loop-func': [2],
    'no-native-reassign': [2],
    'no-useless-concat': [2],
    'no-var': [2],
    'no-void': [2],
    'operator-assignment': [2, 'always'],
    'prefer-arrow-callback': [2],
    'prefer-const': [2],
    'prefer-spread': [2],
    'prettier/prettier': [
      'error',
      {
        printWidth: 130,
        trailingComma: 'es5',
        singleQuote: true,
        semi: false,
      }
    ],
    'prefer-template': [2],
    'radix': [2, 'as-needed'],
    'react/no-danger': [2],
    'react/no-did-mount-set-state': [1],
    'react/no-did-update-set-state': [1],
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      modules: true,
    },
    sourceType: 'module',
  },
  settings: {
    react: {
      version: require('./package.json').dependencies.react.slice(1),
    }
  }
};
