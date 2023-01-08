module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
      'semi': ['error', 'never'],
      'quotes': [2, 'single'],
      'arrow-body-style': ['error', 'as-needed'],
      'comma-dangle': ['error', 'never']
    }
}
