const webpack = require('webpack')
let builds  = require('./config').getAllBuilds()
// require('./stylus')

build(builds)

function build (builds) {
  builds.forEach(config => {
    webpack(config, () => {})
  })
}