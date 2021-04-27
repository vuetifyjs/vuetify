import { createApp } from 'vue'
import App from './App'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import vuetify from './vuetify'

import '@mdi/font/css/materialdesignicons.css'

library.add(fas)

const app = createApp(App)

app.use(vuetify)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
