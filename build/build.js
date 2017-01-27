const webpack = require('webpack')
const builds = require('./config').getAllBuilds()

build(builds)

function build (builds) {
  builds.forEach(config => {
    webpack(config, () => {})
  })
}
