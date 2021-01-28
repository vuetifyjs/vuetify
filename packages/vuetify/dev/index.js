import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import { createApp } from 'vue'
import { aliases, mdi } from 'vuetify/src/iconsets/mdi'
import App from './App'

const app = createApp(App)

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

app.use(vuetify)

app.mount('#app')
