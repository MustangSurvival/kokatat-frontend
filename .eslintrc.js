module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb-base'],
    env: {
        browser: true,
        es6: true,
        jquery: true,
    },
    ignorePatterns: [
        'node_modules/',
        'assets/dist/',
        'assets/js/theme/global/jquery-migrate/',
    ],
    rules: {
        // Cornerstone uses both ES modules and CJS require() in config files
        'import/no-commonjs': 'off',
    },
};
