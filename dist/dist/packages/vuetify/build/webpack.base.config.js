"use strict";
require('dotenv').config();
var os = require('os');
var HappyPack = require('happypack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
var isProd = process.env.NODE_ENV === 'production';
var extractCSS = isProd || process.env.TARGET === 'development';
exports.happyThreadPool = HappyPack.ThreadPool({
    size: Math.min(os.cpus().length, 4)
});
var cssLoaders = [
    // https://github.com/webpack-contrib/mini-css-extract-plugin#user-content-advanced-configuration-example
    // TODO: remove style-loader: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/34
    extractCSS ? MiniCssExtractPlugin.loader : 'style-loader',
    { loader: 'css-loader', options: { sourceMap: !isProd } },
    { loader: 'postcss-loader', options: { sourceMap: !isProd } },
    { loader: 'stylus-loader', options: { sourceMap: !isProd } }
];
var plugins = [
    new FriendlyErrorsWebpackPlugin({
        clearConsole: true
    })
];
exports.config = {
    mode: isProd ? 'production' : 'development',
    resolve: {
        extensions: ['*', '.js', '.json', '.vue', '.ts']
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.styl(us)?$/,
                use: cssLoaders
            }
        ]
    },
    plugins: plugins,
    performance: {
        hints: false
    },
    stats: { children: false }
};
//# sourceMappingURL=webpack.base.config.js.map