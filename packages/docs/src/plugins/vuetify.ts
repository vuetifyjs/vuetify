// Styles
import 'vuetify/styles'

// Imports
import { camelize, h } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labs from 'vuetify/labs/components'

// Icons
import { fa } from 'vuetify/iconsets/fa'
import { md } from 'vuetify/iconsets/md'
import { mdi } from 'vuetify/iconsets/mdi-svg'
import * as mdiSvg from './icons'

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
        md,
        mdiSvg: mdi,
        mdi: {
          component: props => {
            const icon = mdiSvg[camelize(props.icon as string) as keyof typeof mdiSvg]
            return h(components.VSvgIcon, { ...props, icon })
          },
        },
      },
      aliases: {
        /* eslint-disable max-len */
        vuetify: 'svg:M7.26 12.28 2 3H12.53L7.26 12.28ZM14.44 3 8.22 13.98 12 20.64 22 3 14.44 3Z',
        'vuetify-outline': 'svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z',
        /* eslint-enable max-len */
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
