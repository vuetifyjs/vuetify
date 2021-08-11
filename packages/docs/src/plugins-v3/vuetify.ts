import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/lib/styles/main.sass'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/lib/components/index'
import * as directives from 'vuetify/lib/directives/index'

import type { vuetifyPlugin } from '@/types'

export const useVuetify: vuetifyPlugin = ({ app }) => {
  const vuetify = createVuetify({
    components,
    directives,
  })
  app.use(vuetify)
}
