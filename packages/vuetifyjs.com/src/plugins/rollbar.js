import Vue from 'vue'
import rollbar from '../util/rollbar'

Vue.prototype.$rollbar = rollbar
Vue.config.errorHandler = (err, vm, info) => {
  rollbar.error(err, { info })
}
