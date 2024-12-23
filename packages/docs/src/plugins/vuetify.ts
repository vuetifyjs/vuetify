// Styles
import 'vuetify/styles'

// Imports
import { createVuetify } from 'vuetify'
import { VChip } from 'vuetify/components/VChip'
import { VBtn } from 'vuetify/components/VBtn'
import { VSwitch } from 'vuetify/components/VSwitch'
import { VSvgIcon } from 'vuetify/components/VIcon'

// Icons
import { fa } from 'vuetify/iconsets/fa'
import { md } from 'vuetify/iconsets/md'
import { mdi } from 'vuetify/iconsets/mdi-svg'
import * as mdiSvg from './icons'
import { aliases } from '@vuetify/one'

// Locales
import { en, sv } from 'vuetify/locale'

// Types
import type { App } from 'vue'
import type { IconProps } from 'vuetify'

export function installVuetify (app: App) {
  const vuetify = createVuetify({
    aliases: {
      BorderChip: VChip,
      NewInChip: VChip,
      PageFeatureChip: VChip,
      PrimaryBtn: VBtn,
      SettingsSwitch: VSwitch,
    },
    defaults: {
      global: {
        eager: false,
      },
      NewInChip: {
        appendIcon: 'mdi-page-next',
        class: 'ms-2 text-mono',
        color: 'success',
        label: true,
        size: 'small',
        tag: 'div',
        variant: 'flat',

        VIcon: {
          class: 'ms-2',
          size: 'small',
        },
      },
      PageFeatureChip: {
        variant: 'tonal',
        border: true,
        class: 'text-medium-emphasis me-2 mb-2',
        size: 'small',
      },
      PrimaryBtn: {
        border: true,
        class: 'text-none',
        color: 'primary',
        slim: true,
        size: 'small',
        variant: 'outlined',

        VProgressCircular: {
          indeterminate: true,
          size: 16,
          width: 1,
        },
      },
      SettingsSwitch: {
        class: 'ps-1 mb-2',
        color: 'primary',
        density: 'compact',
        inset: true,
        trueIcon: 'mdi-check',
        falseIcon: '$close',
        hideDetails: 'auto',
      },
      BorderChip: {
        border: true,
        label: true,
        size: 'small',
        variant: 'text',

        VIcon: {
          color: 'medium-emphasis',
          size: 'small',
        },
      },
    },
    locale: {
      locale: 'en',
      messages: {
        en,
        sv,
      },
    },
    icons: {
      defaultSet: 'mdi',
      sets: {
        fa,
        md,
        mdiSvg: mdi,
        mdi: {
          component: (props: IconProps) => {
            const icon = mdiSvg[camelize(props.icon as string) as keyof typeof mdiSvg]
            return h(VSvgIcon, { ...props, icon })
          },
        },
      },
      aliases,
    },
    theme: {
      themes: {
        light: {
          colors: {
            'surface-variant-alt': '#dedede',
            primary: '#1867c0',
            secondary: '#5CBBF6',
            tertiary: '#E57373',
            accent: '#005CAF',
            quarternary: '#B0D1E8',
            'surface-bright': '#fafafa',
          },
        },
        dark: {
          colors: {
            'surface-variant-alt': '#333333',
            primary: '#2196F3',
            secondary: '#424242',
            tertiary: '#E57373',
            accent: '#FF4081',
            quarternary: '#B0D1E8',
            'surface-bright': '#474747',
          },
        },
        blackguard: {
          dark: true,
          colors: {
            background: '#0f0c24',
            primary: '#e7810d',
            surface: '#1e184a',
            'on-surface-variant': '#4c219e',
            info: '#9c27b0',
            accent: '#FF4081',
            success: '#84b38a',
            'surface-bright': '#362b89',
          },
          variables: {
            'theme-code': '#15123d',
          },
        },
      },
    },
  })
  app.use(vuetify)
}
