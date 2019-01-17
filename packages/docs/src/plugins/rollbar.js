import Vue from 'vue'
import rollbar from '../util/rollbar'

if (rollbar.enabled) {
  Vue.prototype.$rollbar = rollbar
  Vue.config.errorHandler = (err, vm, info) => {
    rollbar.error(err, { info })
  }
}
