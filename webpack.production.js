var path = require('path');
var webpack = require('webpack');

var webpackConfig = {
    context: __dirname,
    entry: {
        "react-resizable-textarea": "./src/react-resizable-textarea.js",
        "react-resizable-textarea.min": "./src/react-resizable-textarea.js",
    },
    output: {
        path: __dirname + '/dist',
        filename: "[name].js",
        library: 'ReactResizableTextarea',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: [/node_modules/, /dist/], loaders: ["babel-loader", "eslint-loader"]}
        ]
    },
    externals: {
        react: 'umd react'
    }
};

module.exports = webpackConfig;