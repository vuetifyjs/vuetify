// Globals
const { IS_SERVER } = require('../../src/util/globals')

module.exports = api => {
  api.chainWebpack(require(`./config/${IS_SERVER ? 'server' : 'client'}`))
}
