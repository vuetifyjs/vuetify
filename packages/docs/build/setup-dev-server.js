const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const chokidar = require('chokidar')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  } catch (e) {}
}

module.exports = function setupDevServer (app, templatePath, cb) {
  let bundle
  let template
  let clientManifest

  let ready
  const readyPromise = new Promise(resolve => { ready = resolve })
  const update = () => {
    if (bundle && clientManifest) {
      ready()
      cb(bundle, {
        template,
        clientManifest,
        shouldPrefetch: () => false,
      })
    }
  }

  // read template from disk and watch
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index.html template updated.')
    update()
  })

  // modify client config to work with hot middleware
  const entries = [
    clientConfig.entry.app,
    'webpack-hot-middleware/client?reload=true?name=client',
  ]
  clientConfig.entry.app = entries
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

  const combinedConfig = [clientConfig, serverConfig]

  // dev middleware
  const compiler = webpack(combinedConfig)
  const clientCompiler = compiler.compilers.find(compiler => compiler.name === 'client')
  const serverCompiler = compiler.compilers.find(compiler => compiler.name === 'server')
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    stats: 'errors-warnings',
    publicPath: clientConfig.output.publicPath,
    // noInfo: true,
    serverSideRender: true,
  })
  app.use(devMiddleware)
  clientCompiler.hooks.done.tap('dev server', () => {
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ))
    update()
  })
  serverCompiler.hooks.done.tap('dev server', () => {
    bundle = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-server-bundle.json'
    ))
    update()
  })
  compiler.hooks.done.tap('dev server', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
  })

  app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }))

  return readyPromise
}
