os = require('os')
const fs = require('fs')
const path = require('path')
const util = require('util')
const generateRoutes = require('./generate-routes')
const { DynamicPool } = require('node-worker-threads-pool')

const threads = os.cpus().length
const readFile = util.promisify(fs.readFile)
const resolve = file => path.resolve(__dirname, file)

const templatePath = resolve('../src/index.template.html')

const pool = new DynamicPool(threads)

function chunk (arr, chunkSize) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i , i + chunkSize))
  }
  return chunks
}

Promise.all([
  generateRoutes(),
  readFile(templatePath, 'utf-8'),
  readFile('./dist/vue-ssr-server-bundle.json', 'utf-8'),
  readFile('./dist/vue-ssr-client-manifest.json', 'utf-8'),
]).then(([routes, template, serverBundle, clientManifest]) => {
  serverBundle = JSON.parse(serverBundle)
  clientManifest = JSON.parse(clientManifest)
  console.info('Starting prerender')

  chunk(routes, Math.round(routes.length / threads)).forEach((routes, index) => {
    pool.exec({
      workerData: { routes, template, serverBundle, clientManifest, index },
      task () {
        const { routes, template, serverBundle, clientManifest, index } = this.workerData

        const fs = require('fs')
        const path = require('path')
        const util = require('util')
        const mkdirp = require('mkdirp')
        const { performance } = require('perf_hooks')
        const { createBundleRenderer } = require('vue-server-renderer')

        const writeFile = util.promisify(fs.writeFile)

        const renderer = createBundleRenderer(serverBundle, {
          runInNewContext: false,
          clientManifest,
          shouldPrefetch: () => false,
          template,
        })

        console.info(`Renderer ${index} created`)

        routes.reduce((p, route) => {
          return p.then(() => {
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

            return new Promise(resolve => {
              renderer.renderToString(context, (err, html) => {
                if (err) {
                  console.error(`${index}: (${Math.round(performance.now() - start)}ms) ${route.fullPath}`, err)
                  resolve()
                  return
                }

                const dir = path.join('./dist/', route.fullPath)

                mkdirp(dir).then(() =>
                  writeFile(path.join(dir, 'index.html'), html, { encoding: 'utf-8' })
                ).then(() => {
                  console.info(`${index}: (${Math.round(performance.now() - start)}ms) ${route.fullPath}`)
                  resolve()
                })
              })
            })
          })
        }, Promise.resolve()).then(() => process.exit(0))
      },
    })
  })
})
