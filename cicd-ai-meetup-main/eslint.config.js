import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: { console: 'readonly', process: 'readonly', fetch: 'readonly' },
    },
    rules: {
      'no-unused-vars': 'error',
    },
  },
  { ignores: ['reports/', 'node_modules/'] },
];
