import '@mdi/font/css/materialdesignicons.css'

import { createVuetify, VLigatureIcon, VClassIcon, VSvgIcon } from 'vuetify'
import { createApp, h } from 'vue'
import App from './App'

const app = createApp(App)
const vuetify = createVuetify({
  icons: {
    'material-icons': {
      component: props => h(VLigatureIcon, props),
      values: {
        close: 'close',
      },
    },
    mdi: {
      component: props => h(VClassIcon, props),
      values: {
        close: 'mdi-close',
      },
    },
    'mdi-svg': {
      component: props => h(VSvgIcon, props),
      values: {
        close: 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z',
      },
    },
    fa5: {
      component: props => h(VClassIcon, props),
      values: {
        close: 'fas fa-times',
      },
    },
  },
})

app.use(vuetify)

app.mount('#app')
