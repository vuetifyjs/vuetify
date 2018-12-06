import Vue from 'vue'
import Rollbar from 'vue-rollbar'

if (process.env.ROLLBAR_ACCESS_TOKEN) {
  Vue.use(Rollbar, {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    enabled: true,
    source_map_enabled: true,
    environment: process.env.NODE_ENV,
    payload: {
      client: {
        javascript: {
          code_version: '1.0'
        }
      }
    }
  })

  Vue.config.errorHandler = (err, vm, info) => {
    Vue.rollbar.error(err)
  }
}
