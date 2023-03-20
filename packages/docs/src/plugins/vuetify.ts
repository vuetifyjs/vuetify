// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Imports
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labs from 'vuetify/labs/components'

// Icons
import { fa } from 'vuetify/iconsets/fa'
import { md } from 'vuetify/iconsets/md'
import { mdi } from 'vuetify/iconsets/mdi'
import { mdi as mdiSvg } from 'vuetify/iconsets/mdi-svg'

// Types
import type { VuetifyPlugin } from '@/types'

export const useVuetify: VuetifyPlugin = ({ app }) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      ...labs,
    },
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
            quarternary: '#B0D1E8',
          },
        },
        dark: {
          colors: {
            primary: '#2196F3',
            secondary: '#424242',
            tertiary: '#E57373',
            accent: '#FF4081',
            quarternary: '#B0D1E8',
          },
        },
      },
    },
  })
  app.use(vuetify)
}
