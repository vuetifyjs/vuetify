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
import * as mdiSvg from '@mdi/js'

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
        // eslint-disable-next-line max-len
        vuetify: 'svg:M7.26303 12.2838L7.00113 11.82L2 3H12H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26307 12.2838C7.26307 12.2838 7.26307 12.2838 7.26306 12.2838L7.26303 12.2838ZM14.4359 3.01765L8.2241 13.9769L12 20.64L17.0011 11.82L22 3H14.4459L14.4359 3.01765Z',
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
