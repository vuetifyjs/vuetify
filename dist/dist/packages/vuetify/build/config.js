"use strict";
var webpack = require('webpack');
var merge = require('webpack-merge');
var TerserPlugin = require('terser-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var base = require('./webpack.prod.config');
var version = process.env.VERSION || require('../package.json').version;
var builds = {
    development: {
        config: {
            devtool: 'source-map',
            mode: 'development',
            output: {
                filename: 'vuetify.js',
                libraryTarget: 'umd'
            },
            plugins: [
                new MiniCssExtractPlugin({
                    filename: 'vuetify.css'
                })
            ]
        }
    },
    production: {
        config: {
            mode: 'production',
            output: {
                filename: 'vuetify.min.js',
                libraryTarget: 'umd'
            },
            plugins: [
                new MiniCssExtractPlugin({
                    filename: 'vuetify.min.css'
                })
            ],
            performance: {
                hints: 'warning',
                maxEntrypointSize: 500000
            }
        },
        env: 'production'
    }
};
function genConfig(opts) {
    var config = merge({}, base, opts.config);
    config.plugins = config.plugins.concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(opts.env || 'development')
        })
    ]);
    if (opts.env) {
        config.plugins = config.plugins.concat([
            new webpack.BannerPlugin({
                banner: "/*!\n* Vuetify v" + version + "\n* Forged by John Leider\n* Released under the MIT License.\n*/     ",
                raw: true,
                entryOnly: true
            })
        ]);
        config.optimization = {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }),
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorOptions: {
                        discardComments: { removeAll: true },
                        postcssZindex: false,
                        reduceIdents: false
                    },
                    canPrint: false
                })
            ]
        };
    }
    return config;
}
if (process.env.TARGET) {
    module.exports = genConfig(builds[process.env.TARGET]);
}
else {
    module.exports = Object.keys(builds).map(function (name) { return genConfig(builds[name]); });
}
//# sourceMappingURL=config.js.map