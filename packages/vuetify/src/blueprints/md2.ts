// Icons
import { mdi } from '@/iconsets/mdi'

// Types
import type { Blueprint } from '@/framework'

export const md2: Blueprint = {
  defaults: {
    global: {
      rounded: 'md',
    },
    VAvatar: {
      rounded: 'circle',
    },
    VAutocomplete: {
      variant: 'filled',
    },
    VBanner: {
      color: 'primary',
    },
    VBtn: {
      color: 'primary',
    },
    VCheckbox: {
      color: 'secondary',
    },
    VCombobox: {
      variant: 'filled',
    },
    VDatePicker: {
      color: 'primary',
      controlHeight: 56,
      elevation: 2,
      rounded: 'md',

      VBtn: {
        color: 'high-emphasis',
        rounded: 'circle',
      },
    },
    VSelect: {
      variant: 'filled',
    },
    VSlider: {
      color: 'primary',
    },
    VTabs: {
      color: 'primary',
    },
    VTextarea: {
      variant: 'filled',
    },
    VTextField: {
      variant: 'filled',
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
          primary: '#6200EE',
          'primary-darken-1': '#3700B3',
          secondary: '#03DAC6',
          'secondary-darken-1': '#018786',
          error: '#B00020',
        },
      },
    },
  },
}
