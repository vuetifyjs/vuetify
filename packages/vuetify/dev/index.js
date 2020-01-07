import App from './App'
import {
  h,
  createApp,
} from 'vue'
import {
  createVuetify,
  VuetifyInstall,
} from 'vuetify'

const app = createApp()

app.use(VuetifyInstall)

app.mount({
  setup () {
    createVuetify()

    return () => h(App)
  },
}, '#app')
