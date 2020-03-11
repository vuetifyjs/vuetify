const os = require('os')
const fs = require('fs')
const path = require('path')
const util = require('util')
const mkdirp = require('mkdirp')
const { performance } = require('perf_hooks')
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads')

const ProgressBar = require('progress')
const { createBundleRenderer } = require('vue-server-renderer')

const languages = require('../src/data/i18n/languages.json')
const availableLanguages = languages.map(lang => lang.alternate || lang.locale)

const threads = os.cpus().length
const resolve = file => path.resolve(__dirname, file)

function chunk (arr, chunkSize) {
  const chunks = []

  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i , i + chunkSize))
  }

  return chunks
}

function readFile (file) {
  return fs.readFileSync(resolve(file), 'utf-8')
}
const writeFile = util.promisify(fs.writeFile)

/**
 * Call cb for each item in arr, waiting for a returned
 * promise to resolve before calling on the next item
 *
 * @param {any[]} arr
 * @param {function(*): Promise<void>} cb
 * @return {Promise<void>}
 */
function forEachSequential (arr, cb) {
  return arr.reduce((p, val) => {
    return p.then(() => {
      return cb(val)
    })
  }, Promise.resolve())
}

if (isMainThread) {
  const routes = require('./generate-routes')
  const template = readFile('../src/index.template.html')
  const bundle = JSON.parse(readFile('../dist/vue-ssr-server-bundle.json'))
  const clientManifest = JSON.parse(readFile('../dist/vue-ssr-client-manifest.json'))

  const bar = new ProgressBar('[:bar] :percent | ETA: :etas | :current/:total | :timems | :lastFile', {
    total: routes.length,
    width: 64,
  })

  chunk(routes, Math.round(routes.length / threads)).forEach((routes, index) => {
    const worker = new Worker(__filename, {
      workerData: { routes, template, bundle, clientManifest, index },
      stdout: true,
    })

    const interrupt = process.stdout.clearLine ? bar.interrupt.bind(bar) : console.log.bind(console)
    worker.on('message', ({ message, error, lastFile, time }) => {
      if (message) {
        interrupt(message)
      }
      if (error) {
        interrupt('\n' + lastFile + '\n' + error)
      }

      if (lastFile) {
        bar.tick({ lastFile, time })
      }
    })
  })
} else {
  const { routes, template, bundle, clientManifest, index } = workerData

  const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    clientManifest,
    shouldPrefetch: () => false,
    template,
  })

  parentPort.postMessage({
    message: `Renderer ${index} created`
  })

  // Redirect console.log to the main thread
  let currentRoute
  const write = process.stdout.write
  process.stdout.write = data => {
    parentPort.postMessage({
      message: '\n' + currentRoute.fullPath + '\n' + data.toString()
    })
    return write.call(process.stdout, data)
  }

  forEachSequential(routes, route => {
    currentRoute = route
    const start = performance.now()

    const context = {
      hostname: 'https://vuetifyjs.com', // TODO
      hreflangs: availableLanguages.reduce((acc, lang) => {
        const href = path.normalize(`/${lang}/${route.path}`)
        return acc + `<link rel="alternate" hreflang="${lang}" href="${href}">`
      }, ''),
      lang: route.locale,
      scripts: '',
      title: 'Vuetify', // default title
      url: route.fullPath,
    }

    return renderer.renderToString(context).then(html => {
      const dir = path.join('./dist/', route.fullPath)

      return mkdirp(dir).then(() =>
        writeFile(path.join(dir, 'index.html'), html, { encoding: 'utf-8' })
      ).then(() => {
        parentPort.postMessage({
          lastFile: route.fullPath,
          time: Math.round(performance.now() - start),
        })
      })
    }).catch(err => {
      parentPort.postMessage({
        error: err.stack,
        lastFile: route.fullPath,
        time: Math.round(performance.now() - start),
      })
    })
  }).then(() => process.exit(0))
}
