// Icons
import { mdi } from '@/iconsets/mdi'

// Types
import type { Blueprint } from '@/framework'
import { palette } from './palette'

export const md3: Blueprint = {
  defaults: {
    VAppBar: {
      flat: true,
    },
    VAutocomplete: {
      variant: 'filled',
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
      variant: 'filled',
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
    VNavigationDrawer: {
      // VList: {
      //   nav: true,
      //   VListItem: {
      //     rounded: 'xl',
      //   },
      // },
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
        dark: false,
        colors: {
          // Primary colors
          primary: palette.primary[40],
          'primary-container': palette.primary[90],

          // Secondary colors
          secondary: palette.secondary[40],
          'secondary-container': palette.secondary[90],

          // Tertiary colors
          tertiary: palette.tertiary[40],
          'tertiary-container': palette.tertiary[90],

          // Success colors
          success: palette.success[40],
          'success-container': palette.success[90],

          // Info colors
          info: palette.info[40],
          'info-container': palette.info[90],

          // Warning colors
          warning: palette.warning[40],
          'warning-container': palette.warning[90],

          // Error colors
          error: palette.error[40],
          'error-container': palette.error[90],

          // Surface colors
          surface: palette.neutral[98],
          background: palette.neutral[98],
          'surface-variant': palette.neutralVariant[90],
          'surface-container-highest': palette.neutral[90],
          'surface-container-high': palette.neutral[92],
          'surface-container': palette.neutral[94],
          'surface-container-low': palette.neutral[96],
          'surface-container-lowest': palette.neutral[100],
          'inverse-surface': palette.neutral[20],
          'inverse-on-surface': palette.neutral[95],
          'surface-tint': palette.primary[40],
          'surface-tint-color': palette.primary[40],

          // Outline colors
          outline: palette.neutralVariant[50],
          'outline-variant': palette.neutralVariant[80],

          // Add-on Primary colors
          'primary-fixed': palette.primary[90],
          'primary-fixed-dim': palette.primary[80],
          'inverse-primary': palette.primary[80],

          // Add-on Secondary colors
          'secondary-fixed': palette.secondary[90],
          'secondary-fixed-dim': palette.secondary[80],

          // Add-on Tertiary colors
          'tertiary-fixed': palette.tertiary[90],
          'tertiary-fixed-dim': palette.tertiary[80],

          // Add-ons Surface colors
          'surface-bright': palette.neutral[98],
          'surface-dim': palette.neutral[87],
          scrim: palette.neutral[0],
          shadow: palette.neutral[0],
        },
      },
      dark: {
        dark: true,
        colors: {
          // Primary colors
          primary: palette.primary[80],
          'primary-container': palette.primary[30],

          // Secondary colors
          secondary: palette.secondary[80],
          'secondary-container': palette.secondary[30],

          // Tertiary colors
          tertiary: palette.tertiary[80],
          'tertiary-container': palette.tertiary[30],

          // Success colors
          success: palette.success[80],
          'success-container': palette.success[30],

          // Info colors
          info: palette.info[80],
          'info-container': palette.info[30],

          // Warning colors
          warning: palette.warning[80],
          'warning-container': palette.warning[30],

          // Error colors
          error: palette.error[80],
          'error-container': palette.error[30],

          // Surface colors
          surface: palette.neutral[10],
          background: palette.neutral[10],
          'surface-variant': palette.neutralVariant[30],
          'surface-container-highest': palette.neutral[20],
          'surface-container-high': palette.neutral[20],
          'surface-container': palette.neutral[10],
          'surface-container-low': palette.neutral[10],
          'surface-container-lowest': palette.neutral[0],
          'inverse-surface': palette.neutral[90],
          'inverse-on-surface': palette.neutral[20],
          'surface-tint': palette.primary[80],
          'surface-tint-color': palette.primary[80],

          // Outline colors
          outline: palette.neutralVariant[60],
          'outline-variant': palette.neutralVariant[30],

          // Add-on Primary colors
          'primary-fixed': palette.primary[90],
          'primary-fixed-dim': palette.primary[80],
          'inverse-primary': palette.primary[40],

          // Add-on Secondary colors
          'secondary-fixed': palette.secondary[90],
          'secondary-fixed-dim': palette.secondary[80],

          // Add-on Tertiary colors
          'tertiary-fixed': palette.tertiary[90],
          'tertiary-fixed-dim': palette.tertiary[80],

          // Add-ons Surface colors
          'surface-bright': palette.neutral[20],
          'surface-dim': palette.neutral[10],
          scrim: palette.neutral[0],
          shadow: palette.neutral[0],
        },
      },
    },
  },
}
