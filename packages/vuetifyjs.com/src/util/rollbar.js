const Rollbar = require('rollbar')

const tokens = {
  server: '55e39f2b749c4fb88a4e097b1922af8d',
  client: 'ab7bd8b91ef94a13897d45f6972578d4'
}

const rollbar = new Rollbar({
  accessToken: process.env.VUE_ENV === 'client' ? tokens.client : tokens.server,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: process.env.NODE_ENV === 'production' && !!process.env.NOW_URL,
  source_map_enabled: true,
  environment: process.env.NODE_ENV,
  verbose: true,
  payload: {
    server: {
      host: process.env.NOW_URL
    }
  }
})

module.exports = rollbar
