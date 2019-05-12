const path = require("path");

module.exports = {
    entry: {
        signin: "./src/app/signin.js"
    },
    output: {
        path: path.join(__dirname, "target", "classes", "static", "js"),
        filename: '[name].js',
        sourceMapFilename: '[name].map'
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