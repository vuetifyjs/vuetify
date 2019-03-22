"use strict";
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var chokidar = require('chokidar');
var clientConfig = require('./webpack.client.config');
var serverConfig = require('./webpack.server.config');
var readFile = function (fs, file) {
    try {
        return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8');
    }
    catch (e) { }
};
module.exports = function setupDevServer(app, templatePath, cb) {
    var bundle;
    var template;
    var clientManifest;
    var ready;
    var readyPromise = new Promise(function (resolve) { ready = resolve; });
    var update = function () {
        if (bundle && clientManifest) {
            ready();
            cb(bundle, {
                template: template,
                clientManifest: clientManifest,
                shouldPrefetch: function () { return false; }
            });
        }
    };
    // read template from disk and watch
    template = fs.readFileSync(templatePath, 'utf-8');
    chokidar.watch(templatePath).on('change', function () {
        template = fs.readFileSync(templatePath, 'utf-8');
        console.log('index.html template updated.');
        update();
    });
    // modify client config to work with hot middleware
    var entries = [
        clientConfig.entry.app,
        'webpack-hot-middleware/client?reload=true?name=client'
    ];
    clientConfig.entry.app = entries;
    clientConfig.output.filename = '[name].js';
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    var combinedConfig = [clientConfig, serverConfig];
    // dev middleware
    var compiler = webpack(combinedConfig);
    var clientCompiler = compiler.compilers.find(function (compiler) { return compiler.name === 'client'; });
    var serverCompiler = compiler.compilers.find(function (compiler) { return compiler.name === 'server'; });
    var devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: clientConfig.output.publicPath,
        // noInfo: true,
        serverSideRender: true
    });
    app.use(devMiddleware);
    clientCompiler.hooks.done.tap('dev server', function () {
        clientManifest = JSON.parse(readFile(devMiddleware.fileSystem, 'vue-ssr-client-manifest.json'));
        update();
    });
    serverCompiler.hooks.done.tap('dev server', function () {
        bundle = JSON.parse(readFile(devMiddleware.fileSystem, 'vue-ssr-server-bundle.json'));
        update();
    });
    compiler.hooks.done.tap('dev server', function (stats) {
        stats = stats.toJson();
        stats.errors.forEach(function (err) { return console.error(err); });
        stats.warnings.forEach(function (err) { return console.warn(err); });
    });
    app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }));
    return readyPromise;
};
//# sourceMappingURL=setup-dev-server.js.map