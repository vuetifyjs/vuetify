const Rollbar = require('rollbar')

const tokens = {
  server: 'c2ddf7aafca54bd298295e9da8c1ca4b',
  client: '29988c905fd2469e85a95aef5a16f411'
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
