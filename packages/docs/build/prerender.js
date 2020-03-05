const fs = require('fs')
const path = require('path')
const util = require('util')
const mkdirp = require('mkdirp')
const { performance } = require('perf_hooks')
const generateRoutes = require('./generate-routes')
const { createBundleRenderer } = require('vue-server-renderer')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const resolve = file => path.resolve(__dirname, file)

const templatePath = resolve('../src/index.template.html')

Promise.all([
  generateRoutes(),
  readFile(templatePath, 'utf-8'),
  readFile('./dist/vue-ssr-server-bundle.json', 'utf-8'),
  readFile('./dist/vue-ssr-client-manifest.json', 'utf-8'),
]).then(([routes, template, serverBundle, clientManifest]) => {
  console.info('Starting prerender')

  const renderer = createBundleRenderer(JSON.parse(serverBundle), {
    runInNewContext: false,
    clientManifest: JSON.parse(clientManifest),
    shouldPrefetch: () => false,
    template,
  })

  console.info('Renderer created')

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
            console.error(`(${Math.round(performance.now() - start)}ms) ${route.fullPath}`, err)
            resolve()
            return
          }

          const dir = path.join('./dist/', route.fullPath)

          mkdirp(dir).then(() =>
            writeFile(path.join(dir, 'index.html'), html, { encoding: 'utf-8' })
          ).then(() => {
            console.info(`(${Math.round(performance.now() - start)}ms) ${route.fullPath}`)
            resolve()
          })
        })
      })
    })
  }, Promise.resolve())
})
