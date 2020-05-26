import { createApp } from 'vue'
import Playground from './Playground.vue'
import Vuetify from '/src/full.ts'

const app = createApp(Playground)

app.use(Vuetify)

app.mount('#app')
