const fs = require('fs')
const util = require('util')
const readdir = util.promisify(fs.readdir)
const path = require('path')
const glob = require('glob')
const { kebabCase } = require('lodash')

const resolve = file => path.resolve(__dirname, file)

const DATA_PATH_PUG_FILES = resolve('../src/data/pages/**/*.pug')
const languages = require('../src/data/i18n/languages.json')
  .map(lang => lang.alternate || lang.locale)
  .filter(lang => lang !== 'eo-UY')

function genDocumentation () {
  const files = glob.sync(DATA_PATH_PUG_FILES)
  const paths = ['/']

  for (const file of files) {
    const route = file
      .split('/pages/')
      .pop()
      .split('/')
      .map(i => kebabCase(i.replace(/pug/, '')).toLowerCase())
      .join('/')

    paths.push(`/${route}`)
  }

  return paths
}

function genDemos () {
  const files = glob.sync(resolve('../src/layouts/layouts/demos/*.vue'))
  const paths = []

  for (const file of files) {
    const route = file
      .split('/demos/')
      .pop()
      .replace(/\.vue$/, '')

    paths.push(`/examples/layouts/${route}`)
  }

  return paths
}

const paths = [
  ...genDocumentation(),
  ...genDemos(),
]
const routes = [{ locale: '', path: '', fullPath: '/' }]

for (const locale of languages) {
  for (const path of paths) {
    routes.push({ locale, path, fullPath: `/${locale}${path}` })
  }
}

module.exports = routes
