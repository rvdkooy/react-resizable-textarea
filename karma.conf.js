module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            {pattern: '__tests__/bundle.js', watched: false, included: true, served: true},
        ],
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
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
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,
        singleRun: false,
        webpack: {
            module: {
                loaders: [
                    {test: /\.jsx?$/, exclude: [/node_modules/], loader: "babel-loader"}
                ]
            },
            webpackMiddleware: {
                noInfo: true,
                stats: {
                    chunks: false
                }
            }
        },
    });
};