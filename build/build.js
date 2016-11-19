const webpack = require('webpack')
let builds  = require('./config').getAllBuilds()

build(builds)

function build (builds) {
  builds.forEach(config => {
    webpack(config, () => {})
  })
}