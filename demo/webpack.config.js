var path = require('path');

var webpackConfig = {
    context: __dirname,
    entry: "./app.jsx",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        rules: [
            {test: /\.jsx?$/, exclude: [/node_modules/, /dist/], loaders: ["babel-loader", "eslint-loader"]}
        ]
    },
    mode: 'development',
};

module.exports = webpackConfig;