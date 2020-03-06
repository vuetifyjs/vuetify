const fs = require('fs')
const util = require('util')
const readdir = util.promisify(fs.readdir)
const path = require('path')
const glob = require('glob')
const { kebabCase } = require('lodash')

const resolve = file => path.resolve(__dirname, file)

const DATA_PATH_JSON_FILES = resolve('../src/data/pages/**/*.json')
const languages = require('../src/data/i18n/languages.json')
  .map(lang => lang.alternate || lang.locale)
  .filter(lang => lang !== 'eo-UY')

module.exports = function generateRoutes () {
  return new Promise((resolve, reject) => {
    glob(DATA_PATH_JSON_FILES, (err, files) => {
      if (err) return reject(err)

      const paths = ['/']
      const routes = [{ locale: '', path: '', fullPath: '/' }]

      for (const file of files) {
        const route = file
          .split('/pages/')
          .pop()
          .split('/')
          .map(i => kebabCase(i.replace(/json/, '')).toLowerCase())
          .join('/')

        paths.push(`/${route}`)
      }

      for (const locale of languages) {
        for (const path of paths) {
          routes.push({ locale, path, fullPath: `/${locale}${path}` })
        }
      }

      resolve(routes)
    })
  })
}
