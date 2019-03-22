"use strict";
var merge = require('webpack-merge');
var HappyPack = require('happypack');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var _a = require('./webpack.base.config'), baseWebpackConfig = _a.config, happyThreadPool = _a.happyThreadPool;
// Helpers
var resolve = function (file) { return require('path').resolve(__dirname, file); };
module.exports = merge(baseWebpackConfig, {
    entry: {
        app: './src/index.ts'
    },
    output: {
        path: resolve('../dist'),
        publicPath: '/dist/',
        library: 'Vuetify',
        libraryTarget: 'umd',
        libraryExport: 'default',
        // See https://github.com/webpack/webpack/issues/6522
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    externals: {
        vue: {
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
            root: 'Vue'
        }
    },
    module: {
        rules: [
            {
                test: /\.[jt]s$/,
                use: 'happypack/loader?id=scripts',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            tsconfig: resolve('../tsconfig.json')
        }),
        new HappyPack({
            id: 'scripts',
            threadPool: happyThreadPool,
            loaders: [
                'babel-loader',
                {
                    loader: 'ts-loader',
                    options: { happyPackMode: true }
                }
            ]
        })
    ]
});
//# sourceMappingURL=webpack.prod.config.js.map