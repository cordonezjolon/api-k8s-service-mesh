export default [
  {
    ignores: ['actions-runner/**'], // 👈 Add this block
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        require: 'readonly',
        process: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly'
      }
    },
    rules: {
      // Puedes agregar reglas personalizadas aquí si quieres
    }
  }
];
