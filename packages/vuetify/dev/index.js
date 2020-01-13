import '@mdi/font/css/materialdesignicons.css'

import App from './App'
import Vuetify from 'vuetify'
import { createApp } from 'vue'

const app = createApp()

app.use(Vuetify)

app.mount(App, '#app')
