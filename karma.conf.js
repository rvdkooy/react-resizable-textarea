process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            { pattern: '__tests__/bundle.js', watched: false, included: true, served: true },
        ],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-webpack'
        ],
        reporters: ['progress'],
        preprocessors: {
            '__tests__/bundle.js': ['webpack']
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless_WithoutSandbox'],
        customLaunchers: {
            ChromeHeadless_WithoutSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },
        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,
        singleRun: false,
        webpack: {
            module: {
                rules: [
                    { test: /\.jsx?$/, exclude: [/node_modules/], loaders: ["babel-loader", "eslint-loader"] }
                ]
            },
            devServer: {
                noInfo: true,
                stats: {
                    chunks: false
                }
            }
        },
        mode: 'development',
    });
};