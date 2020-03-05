const {
  readdirSync,
  writeFileSync,
} = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const glob = require('glob')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')
const { kebabCase } = require('lodash')

const DIST_PATH = resolve('../dist')
const DATA_PATH_JSON_FILES = resolve('../src/data/pages/**/*.json')
const LANG_PATH = resolve('../src/lang')
const ROUTE_JSON_FILE_PATH = resolve('../dist/routes.json')

function getLangs () {
  return readdirSync(LANG_PATH, { withFileTypes: false })
    .filter(file => file !== 'eo-UY')
}

function genRoutes () {
  glob(DATA_PATH_JSON_FILES, (err, files) => {
    if (err) return console.log(err)

    const paths = ['']
    const routes = []

    for (const file of files) {
      const route = file
        .split('/pages/')
        .pop()
        .split('/')
        .map(i => kebabCase(i.replace(/json/, '')).toLowerCase())
        .join('/')

      paths.push(`/${route}`)
    }

    for (const locale of getLangs()) {
      for (const path of paths) {
        routes.push(`/${locale}${path}`)
      }
    }

    writeFileSync(ROUTE_JSON_FILE_PATH, JSON.stringify(routes), { encoding: 'utf-8' })

    process.exit(0)
  })
}

function run () {
  rimraf(DIST_PATH, {}, () => {
    mkdirp(DIST_PATH)

    genRoutes()
  })
}

run()
