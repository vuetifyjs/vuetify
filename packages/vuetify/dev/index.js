import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.performance = true

Vue.use(Vuetify)

const vm = new Vue({
  data: () => ({ isLoaded: document.readyState === 'complete' }),
  render (h) {
    return this.isLoaded ? h(App) : undefined
  }
}).$mount('#app')

// Prevent layout jump while waiting for styles
vm.isLoaded || window.addEventListener('load', () => {
  vm.isLoaded = true
})
