os = require('os')
const fs = require('fs')
const path = require('path')
const util = require('util')
const generateRoutes = require('./generate-routes')
const { DynamicPool } = require('node-worker-threads-pool')

const threads = os.cpus().length
const resolve = file => path.resolve(__dirname, file)

const pool = new DynamicPool(threads)

function log (msg) {
  console.info('\n')
  console.info(msg)
  console.info('\n')
}

function chunk (arr, chunkSize) {
  const chunks = []

  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i , i + chunkSize))
  }

  return chunks
}

function promise (cb) {
  return new Promise(resolve => {
    let value

    try {
      value = cb()
    } catch (err) {
      log(err)

      process.exit(1)
    }

    resolve(value)
  })
}

function readFile (file) {
  const read = util.promisify(fs.readFile)

  return promise(() => read(resolve(file), 'utf-8'))
}

async function readTemplate () {
  return readFile('../src/index.template.html')
}

async function readBundle () {
  return JSON.parse(await readFile('../dist/vue-ssr-server-bundle.json'))
}

async function readManifest () {
  return JSON.parse(await readFile('../dist/vue-ssr-server-bundle.json'))
}

async function run () {
  const routes = await promise(generateRoutes).catch(log)
  const template = await promise(readTemplate).catch(log)
  const bundle = await promise(readBundle).catch(log)
  const manifest = await promise(readManifest).catch(log)

  chunk(routes, Math.round(routes.length / threads)).forEach((routes, index) => {
    pool.exec({
      workerData: { routes, template, bundle, manifest, index },
      task () {
        const { routes, template, bundle, manifest, index } = this.workerData

        const fs = require('fs')
        const path = require('path')
        const util = require('util')
        const mkdirp = require('mkdirp')
        const { performance } = require('perf_hooks')
        const { createBundleRenderer } = require('vue-server-renderer')

        const writeFile = util.promisify(fs.writeFile)

        const renderer = createBundleRenderer(bundle, {
          runInNewContext: false,
          manifest,
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
}

run()
