"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
        return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
    }
    catch (error) {
        e = { error: error };
    }
    finally {
        try {
            if (r && !r.done && (m = i["return"]))
                m.call(i);
        }
        finally {
            if (e)
                throw e.error;
        }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
};
var webpack = require('webpack');
var merge = require('webpack-merge');
var base = require('./webpack.base.config');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
var isProd = process.env.NODE_ENV === 'production';
var cssLoaders = [
    isProd ? MiniCssExtractPlugin.loader : {
        loader: 'vue-style-loader',
        options: { sourceMap: !isProd }
    },
    {
        loader: 'css-loader',
        options: { sourceMap: !isProd }
    }
];
var config = merge(base, {
    name: 'client',
    entry: {
        app: './src/entry-client.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders
            },
            {
                test: /\.stylus$/,
                use: __spread(cssLoaders, [
                    {
                        loader: 'stylus-loader',
                        options: { sourceMap: false } // stylus-loader sucks at sourcemaps
                    }
                ])
            }
        ]
    },
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.VUE_ENV': '"client"'
        }),
        new VueSSRClientPlugin()
    ],
    optimization: {
        minimize: isProd,
        runtimeChunk: true,
        removeAvailableModules: isProd,
        removeEmptyChunks: isProd,
        splitChunks: isProd && {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 20,
            maxInitialRequests: 5,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }
    }
});
if (isProd) {
    config.plugins.push(new MiniCssExtractPlugin({
        filename: 'common.[chunkhash].css'
    }));
}
module.exports = config;
//# sourceMappingURL=webpack.client.config.js.map