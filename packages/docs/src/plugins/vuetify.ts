import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/lib/components/index'
import * as directives from 'vuetify/lib/directives/index'

import type { VuetifyPlugin } from '@/types'

export const useVuetify: VuetifyPlugin = ({ app }) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        light: {
          colors: {
            primary: '#1867c0',
            secondary: '#5CBBF6',
            tertiary: '#E57373',
            accent: '#005CAF',
          },
        },
      },
    },
  })
  app.use(vuetify)
}
