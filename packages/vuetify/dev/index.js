import { h, createApp } from 'vue'
import App from './App'

const app = createApp()

app.mount({
  setup () {
    return () => h(App)
  },
}, '#app')
