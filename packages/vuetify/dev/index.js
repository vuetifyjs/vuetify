import '@mdi/font/css/materialdesignicons.css'

import App from './App'
import Vuetify from 'vuetify'
import { createApp } from 'vue'

const app = createApp()
const options = {}

app.use(Vuetify, options)

app.mount(App, '#app')
