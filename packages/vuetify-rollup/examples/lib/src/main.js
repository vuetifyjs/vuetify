import { createApp } from 'vue'
import Vuetify from 'vuetify/lib'
import App from './App.vue'

const app = createApp(App)

app.use(Vuetify)

app.mount('#app')
