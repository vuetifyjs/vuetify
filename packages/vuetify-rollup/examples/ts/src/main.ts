import { createApp } from 'vue'
import Vuetify from 'vuetify-rollup'
import App from './App'

const app = createApp(App)

app.use(Vuetify)

app.mount('#app')
