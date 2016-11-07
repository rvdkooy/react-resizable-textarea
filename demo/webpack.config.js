var path = require('path');

var webpackConfig = {
    context: __dirname,
    entry: "./app.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: [/node_modules/], loader: "babel-loader"}
        ]
    }
};

module.exports = webpackConfig;