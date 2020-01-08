import '@mdi/font/css/materialdesignicons.css'
import App from './App'
import { h, createApp } from 'vue'
import Vuetify from 'vuetify'

const app = createApp()

app.use(Vuetify)

app.mount(App, '#app')
