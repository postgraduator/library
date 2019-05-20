const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        signin: './src/app/signin.js',
        library: './src/app/library.js'
    },
    output: {
        path: path.join(__dirname, 'target', 'classes', 'assets', 'js'),
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
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'node_modules', 'bootstrap', 'dist', 'css', 'bootstrap.min.css'),
            to: path.resolve(__dirname, 'target', 'classes', 'assets', 'css', 'bootstrap.css'),
            toType: 'file'
        }]),
        new webpack.ProvidePlugin({
            React: 'react'
        })
    ]
};