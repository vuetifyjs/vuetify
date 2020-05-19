import { createApp } from 'vue'
import Playground from './Playground.vue'
import Vuetify from 'vuetify-rollup/dist/vuetify.esm.js'
import 'vuetify-rollup/dist/vuetify.css'

const app = createApp(Playground)

app.use(Vuetify)

app.mount('#app')
