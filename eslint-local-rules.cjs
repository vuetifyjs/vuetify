'use strict'

const path = require('node:path')
const glob = require('glob')

module.exports = Object.fromEntries(
  glob.sync('./scripts/rules/*', { cwd: __dirname, dotRelative: true }).map(name => {
    const modulePath = path.resolve(__dirname, name)
    const module = require(modulePath)
    return [path.parse(name).name, module.default || module]
  })
)
