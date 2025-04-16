// Icons
import { mdi } from '@/iconsets/mdi'

// Types
import type { Blueprint } from '@/framework'

export const md1: Blueprint = {
  defaults: {
    global: {
      rounded: 'sm',
    },
    VAvatar: {
      rounded: 'circle',
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
    VDatePicker: {
      color: 'primary',
      controlHeight: 44,
      elevation: 1,
      rounded: 0,

      VBtn: {
        color: 'high-emphasis',
        rounded: 'circle',
      },
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
    VToolbar: {
      VBtn: {
        color: null,
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
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
