import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/lib/components/index'
import * as directives from 'vuetify/lib/directives/index'
import { fa } from 'vuetify/lib/iconsets/fa'
import { mdi } from 'vuetify/lib/iconsets/mdi'
import { md } from 'vuetify/lib/iconsets/md'
import { mdi as mdiSvg } from 'vuetify/lib/iconsets/mdi-svg'

import type { VuetifyPlugin } from '@/types'

export const useVuetify: VuetifyPlugin = ({ app }) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      sets: {
        fa,
        mdi,
        md,
        mdiSvg,
      },
    },
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
