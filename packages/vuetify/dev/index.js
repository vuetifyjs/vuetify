import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import { createApp } from 'vue'
import App from './App'

const app = createApp(App)
const vuetify = createVuetify()

app.use(vuetify)

app.mount('#app')
