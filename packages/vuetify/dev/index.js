import '@mdi/font/css/materialdesignicons.css'

import App from './App'
import Vuetify from 'vuetify'
import { createApp } from 'vue'

const app = createApp(App)

app.use(Vuetify)

app.mount('#app')
