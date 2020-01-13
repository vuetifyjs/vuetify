import { App, defineComponent } from 'vue'

import Vuetify, {
  useVuetify,
  VBtn,
  VCard,
  VCardText,
} from 'vuetify/lib'

import * as directives from 'vuetify/lib/directives'

declare const app: App

app.use(Vuetify)
app.use(Vuetify, {})
app.use(Vuetify, {
  components: {
    VBtn,
    VCard,
    VCardText,
  },
  directives,
})

defineComponent({
  setup () {
    const vuetify = useVuetify()
  },
})
