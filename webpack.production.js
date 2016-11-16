var path = require('path');

var webpackConfig = {
    context: __dirname,
    entry: "./src/react-resizable-textarea.js",
    output: {
        path: __dirname + '/dist',
        filename: "react-resizable-textarea.js",
        library: 'ReactResizableTextarea',
        libraryTarget: 'umd'
    },
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