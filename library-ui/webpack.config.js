const path = require('path');

module.exports = {
    entry: {
        signin: './src/app/signin.js'
    },
    output: {
        path: path.join(__dirname, 'target', 'classes', 'assets', 'js', '[name]'),
        filename: '[name]-app.js',
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: require.resolve('babel-loader'),
            options: {
                presets: ['env', 'stage-0', 'react']
            }
        }]
    },
};