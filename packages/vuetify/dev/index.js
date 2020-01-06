import App from './App'
import {
  h,
  createApp,
} from 'vue'
import {
  Vuetify,
  VuetifyProvide,
  VuetifyInstall
} from 'vuetify'

const app = createApp()
const vuetify = new Vuetify()

app.use(VuetifyInstall)

app.mount({
  setup () {
    VuetifyProvide(vuetify)

    return () => h(App)
  },
}, '#app')
