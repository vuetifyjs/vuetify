// Types
import type { VuetifyOptions } from '@/framework'

export const md1: Partial<VuetifyOptions> = {
  defaults: {
    global: {
      rounded: 'sm',
    },
    VAutocomplete: {
      variant: 'underlined',
    },
    VBanner: {
      color: 'primary',
    },
    VBtn: {
      color: 'primary',
      rounded: 0,
    },
    VCheckbox: {
      color: 'secondary',
    },
    VCombobox: {
      variant: 'underlined',
    },
    VSelect: {
      variant: 'underlined',
    },
    VSlider: {
      color: 'primary',
    },
    VTabs: {
      color: 'primary',
    },
    VTextarea: {
      variant: 'underlined',
    },
    VTextField: {
      variant: 'underlined',
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#3F51B5',
          'primary-darken-1': '#303F9F',
          'primary-lighten-1': '#C5CAE9',
          secondary: '#FF4081',
          'secondary-darken-1': '#F50057',
          'secondary-lighten-1': '#FF80AB',
          accent: '#009688',
        },
      },
    },
  },
}
