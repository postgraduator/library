const webpackMerge = require('webpack-merge');

module.exports = (env) => webpackMerge(require('./webpack.common'), require(`./webpack.${env}`));