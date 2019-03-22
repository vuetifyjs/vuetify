"use strict";
var path = require('path');
var merge = require('webpack-merge');
var HappyPack = require('happypack');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var VuetifyProgressiveModule = require('vuetify-loader').VuetifyProgressiveModule;
var _a = require('./webpack.base.config'), baseWebpackConfig = _a.config, happyThreadPool = _a.happyThreadPool;
// Helpers
var resolve = function (file) { return path.resolve(__dirname, file); };
module.exports = merge(baseWebpackConfig, {
    devtool: 'source-map',
    entry: ['babel-polyfill', './dev/index.js'],
    output: {
        filename: '[name].js',
        path: resolve('../dev'),
        publicPath: '/dev/',
        library: 'Vuetify'
    },
    resolve: {
        alias: {
            vuetify: resolve('../src'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        modules: [VuetifyProgressiveModule]
                    }
                }
            },
            {
                test: /\.ts$/,
                use: 'happypack/loader?id=ts',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: 'happypack/loader?id=js',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                oneOf: [
                    {
                        test: /\.(png|jpe?g|gif)$/,
                        resourceQuery: /vuetify-preload/,
                        use: [
                            'vuetify-loader/progressive-loader',
                            {
                                loader: 'url-loader',
                                options: { limit: 8000 }
                            }
                        ]
                    },
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'img/[name].[hash:7].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: resolve('../dev'),
        publicPath: '/dev/',
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || '8080',
        disableHostCheck: true
    },
    plugins: [
        new VueLoaderPlugin(),
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            tsconfig: resolve('../tsconfig.json')
        }),
        new HappyPack({
            id: 'ts',
            threadPool: happyThreadPool,
            loaders: [
                'babel-loader',
                {
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        happyPackMode: true
                    }
                },
                'eslint-loader?cache=true?emitWarning=true'
            ]
        }),
        new HappyPack({
            id: 'js',
            threadPool: happyThreadPool,
            loaders: ['babel-loader', 'eslint-loader?cache=true?emitWarning=true']
        })
    ]
});
//# sourceMappingURL=webpack.dev.config.js.map