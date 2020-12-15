const { chunk } = require('lodash')
const os = require('os')
const fs = require('fs')
const path = require('path')
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

const languages = require('../src/i18n/locales.js')
const availableLanguages = languages.map(lang => lang.alternate || lang.locale)

const threads = Math.ceil(os.cpus().length / 2)
const resolve = file => path.resolve(__dirname, file)

function readFile (file) {
  return fs.readFileSync(resolve(file), 'utf-8')
}
const writeFile = fs.promises.writeFile

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

function postMessage (data) {
  if (isMainThread) {
    onMessage(data)
  } else {
    parentPort.postMessage(data)
  }
}

let bar
function onMessage ({ message, error, lastFile, time }) {
  const interrupt = process.stdout.clearLine ? bar.interrupt.bind(bar) : console.log.bind(console)

  if (message) {
    interrupt(message)
  }
  if (error) {
    interrupt('\n' + lastFile + '\n' + error)
  }

  if (lastFile) {
    bar.tick({ lastFile, time })
  }
}

function render ({ routes, template, bundle, clientManifest }) {
  const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    clientManifest,
    shouldPrefetch: () => false,
    template,
  })

  // Redirect console.log to the main thread
  let currentRoute
  if (!isMainThread) {
    const write = process.stdout.write
    process.stdout.write = data => {
      parentPort.postMessage({
        message: '\n' + currentRoute.fullPath + '\n' + data.toString(),
      })
      return write.call(process.stdout, data)
    }
  }

  return forEachSequential(routes, route => {
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
      url: route.fullPath,
    }

    return renderer.renderToString(context).then(html => {
      const dir = path.join('./dist/', route.fullPath)

      return mkdirp(dir).then(() =>
        writeFile(path.join(dir, 'index.html'), html, { encoding: 'utf-8' }),
      ).then(() => {
        postMessage({
          lastFile: route.fullPath,
          time: Math.round(performance.now() - start),
        })
      })
    }).catch(err => {
      postMessage({
        error: err.stack,
        lastFile: route.fullPath,
        time: Math.round(performance.now() - start),
      })
    })
  })
}

if (isMainThread) {
  const routes = require('./generate-routes')
  const template = readFile('../src/ssr.template.html')
  const bundle = JSON.parse(readFile('../dist/vue-ssr-server-bundle.json'))
  const clientManifest = JSON.parse(readFile('../dist/vue-ssr-client-manifest.json'))

  bar = new ProgressBar('[:bar] :percent | ETA: :etas | :current/:total | :timems | :lastFile', {
    total: routes.length,
    width: 64,
  })

  if (process.env.NODE_ENV === 'debug') {
    render({ routes, template, bundle, clientManifest })
  } else {
    const chunkSize = Math.ceil(routes.length / threads)
    chunk(routes, chunkSize).forEach(routes => {
      const worker = new Worker(__filename, {
        workerData: { routes, template, bundle, clientManifest },
        stdout: true,
      })

      worker.on('message', onMessage)
    })
  }
} else {
  render(workerData).then(() => process.exit(0))
}
