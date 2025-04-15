// Icons
import { mdi } from '@/iconsets/mdi'

// Types
import type { Blueprint } from '@/framework'

export const md3: Blueprint = {
  defaults: {
    VAppBar: {
      flat: true,
    },
    VAutocomplete: {
      variant: 'outlined',
    },
    VBanner: {
      color: 'primary',
    },
    VBottomSheet: {
      contentClass: 'rounded-t-xl overflow-hidden',
    },
    VBtn: {
      color: 'primary',
      rounded: 'xl',
    },
    VBtnGroup: {
      rounded: 'xl',
      VBtn: { rounded: null },
    },
    VCard: {
      rounded: 'lg',
    },
    VCheckbox: {
      color: 'secondary',
      inset: true,
    },
    VChip: {
      rounded: 'sm',
    },
    VCombobox: {
      variant: 'outlined',
    },
    VDateInput: {
      variant: 'outlined',
    },
    VDatePicker: {
      controlHeight: 48,
      color: 'primary',
      divided: true,
      headerColor: '',
      elevation: 3,
      rounded: 'xl',

      VBtn: {
        color: 'high-emphasis',
        rounded: 'circle',
      },
    },
    VFileInput: {
      variant: 'outlined',
    },
    VNavigationDrawer: {
      // VList: {
      //   nav: true,
      //   VListItem: {
      //     rounded: 'xl',
      //   },
      // },
    },
    VNumberInput: {
      variant: 'outlined',

      VBtn: {
        color: undefined,
        rounded: undefined,
      }
    },
    VSelect: {
      variant: 'outlined',
    },
    VSlider: {
      color: 'primary',
    },
    VTabs: {
      color: 'primary',
    },
    VTextarea: {
      variant: 'outlined',
    },
    VTextField: {
      variant: 'outlined',
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
          primary: '#6750a4',
          secondary: '#b4b0bb',
          tertiary: '#7d5260',
          error: '#b3261e',
          surface: '#fffbfe',
        },
      },
    },
  },
}
