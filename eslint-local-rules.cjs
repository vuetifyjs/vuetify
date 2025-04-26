'use strict'

const path = require('node:path')
const glob = require('glob')

module.exports = Object.fromEntries(
  glob.sync('./scripts/rules/*', { cwd: __dirname, dotRelative: true }).map(name => (
    [path.parse(name).name, require(name).default]
  ))
)
