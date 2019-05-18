const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: false
                    }
                }
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/[name].css',
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        })
    ]
};