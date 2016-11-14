var path = require('path');

var webpackConfig = {
    context: __dirname,
    entry: "./app.jsx",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: [/node_modules/], loaders: ["babel-loader", "eslint-loader"]}
        ]
    }
};

module.exports = webpackConfig;