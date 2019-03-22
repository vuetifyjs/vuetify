"use strict";
require('dotenv').config();
var path = require('path');
var webpack = require('webpack');
var vueConfig = require('./vue-loader.config');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
var isProd = process.env.NODE_ENV === 'production';
var resolve = function (file) { return path.resolve(__dirname, file); };
var plugins = [
    new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)
    }),
    new VueLoaderPlugin()
];
var devtool = isProd ? 'none' : 'source-map';
module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: devtool,
    output: {
        path: resolve('../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['*', '.js', '.json', '.vue'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            'vue$': 'vue/dist/vue.runtime.esm.js'
        },
        symlinks: false
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            {
                // Load sourcemaps from vuetify, both css + js
                test: /\.(js|css)$/,
                loader: 'source-map-loader',
                include: /vuetify[\\/](dist|es5|lib|src)/,
                enforce: 'pre'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.txt$/,
                use: ['raw-loader']
            }
        ]
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },
    stats: { children: false },
    plugins: plugins
};
plugins.push(new FriendlyErrorsPlugin());
//# sourceMappingURL=webpack.base.config.js.map