const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                include: /\.min\.js$/,
            })
        ],
    },
    module: {
        rules: [
            {test: /\.jsx?$/, exclude: [/node_modules/, /dist/], loaders: ["babel-loader", "eslint-loader"]}
        ]
    },
    externals: {
        react: 'umd react'
    },
    mode: 'production',
};

module.exports = webpackConfig;