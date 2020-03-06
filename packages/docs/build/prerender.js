os = require('os')
const fs = require('fs')
const path = require('path')
const util = require('util')
const generateRoutes = require('./generate-routes')
const { DynamicPool } = require('node-worker-threads-pool')

const threads = os.cpus().length
const resolve = file => path.resolve(__dirname, file)

const pool = new DynamicPool(threads)

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

generateRoutes().then(routes => {
  const template = readFile('../src/index.template.html')
  const bundle = JSON.parse(readFile('../dist/vue-ssr-server-bundle.json'))
  const clientManifest = JSON.parse(readFile('../dist/vue-ssr-client-manifest.json'))

  chunk(routes, Math.round(routes.length / threads)).forEach((routes, index) => {
    pool.exec({
      workerData: { routes, template, bundle, clientManifest, index },
      task () {
        const { routes, template, bundle, clientManifest, index } = this.workerData

        const fs = require('fs')
        const path = require('path')
        const util = require('util')
        const mkdirp = require('mkdirp')
        const { performance } = require('perf_hooks')
        const { createBundleRenderer } = require('vue-server-renderer')

        const writeFile = util.promisify(fs.writeFile)

        const renderer = createBundleRenderer(bundle, {
          runInNewContext: false,
          clientManifest,
          shouldPrefetch: () => false,
          template,
        })

        console.info(`Renderer ${index} created`)

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

        forEachSequential(routes, route => {
          const start = performance.now()

          const context = {
            crowdin: '',
            hostname: 'https://vuetifyjs.com', // TODO
            hreflangs: '', // TODO
            // hreflangs: availableLanguages.reduce((acc, lang) => {
            //   return acc + `<link rel="alternate" hreflang="${lang}" href="https://${req.hostname}/${lang}${encodeURI(req.params[1])}" />`
            // }, ''),
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
              console.info(`${index}: (${Math.round(performance.now() - start)}ms) ${route.fullPath}`)
            })
          }).catch(err => console.error(`${index}: (${Math.round(performance.now() - start)}ms) ${route.fullPath}`, err))
        }).then(() => process.exit(0))
      },
    })
  })
})
