import '@mdi/font/css/materialdesignicons.css'

import App from './App'
import { createVuetify } from 'vuetify'
import { createApp } from 'vue'

const app = createApp(App)
const vuetify = createVuetify()

app.use(vuetify)

app.mount('#app')
