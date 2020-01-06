import App from './App'
import { Vuetify, VuetifyProvide } from 'vuetify'
import { h, createApp } from 'vue'

const app = createApp()
const vuetify = new Vuetify()

app.mount({
  setup () {
    VuetifyProvide(vuetify)

    return () => h(App)
  },
}, '#app')
