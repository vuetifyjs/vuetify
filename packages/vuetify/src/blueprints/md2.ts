/* eslint-disable max-len */
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
      class: 'text-uppercase',
      color: 'primary',
    },
    VCheckbox: {
      color: 'secondary',
      indentDetails: true,
    },
    VCombobox: {
      variant: 'filled',
    },
    VDatePicker: {
      color: 'primary',
      controlHeight: 56,
      elevation: 2,
      rounded: 'md',
      controlVariant: 'modal',

      VBtn: {
        color: 'high-emphasis',
        rounded: 'circle',
      },
    },
    VRadioGroup: {
      indentDetails: true,
    },
    VSelect: {
      variant: 'filled',
    },
    VSlider: {
      color: 'primary',
      indentDetails: true,
    },
    VRangeSlider: {
      indentDetails: true,
    },
    VSwitch: {
      indentDetails: true,
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
  typography: {
    merge: false,
    variables: {
      'font-heading': '"Roboto", sans-serif',
      'font-body': '"Roboto", sans-serif',

      'display-large': 'var:h2-*',
      'headline-large': 'var:h4-*',
      'headline-medium': 'var:h5-*',
      'headline-small': 'var:h6-*',
      'title-large': 'var:h6-*',
      'body-large': 'var:body-1-*',
      'body-medium': 'var:body-2-*',
      'label-large': 'var:button-*',
      'label-small': 'var:caption-*',
    },
    variants: {
      h1: { fontFamily: 'var:font-heading', fontSize: '6rem', lineHeight: 1, fontWeight: 300, letterSpacing: '-.015625em' },
      h2: { fontFamily: 'var:font-heading', fontSize: '3.75rem', lineHeight: 1, fontWeight: 300, letterSpacing: '-.0083333333em' },
      h3: { fontFamily: 'var:font-heading', fontSize: '3rem', lineHeight: 1.05, fontWeight: 400, letterSpacing: 'normal' },
      h4: { fontFamily: 'var:font-heading', fontSize: '2.125rem', lineHeight: 1.175, fontWeight: 400, letterSpacing: '.0073529412em' },
      h5: { fontFamily: 'var:font-heading', fontSize: '1.5rem', lineHeight: 1.333, fontWeight: 400, letterSpacing: 'normal' },
      h6: { fontFamily: 'var:font-heading', fontSize: '1.25rem', lineHeight: 1.6, fontWeight: 500, letterSpacing: '.0125em' },
      'subtitle-1': { fontFamily: 'var:font-body', fontSize: '1rem', lineHeight: 1.75, fontWeight: 400, letterSpacing: '.009375em' },
      'subtitle-2': { fontFamily: 'var:font-body', fontSize: '.875rem', lineHeight: 1.6, fontWeight: 500, letterSpacing: '.0071428571em' },
      'body-1': { fontFamily: 'var:font-body', fontSize: '1rem', lineHeight: 1.5, fontWeight: 400, letterSpacing: '.03125em' },
      'body-2': { fontFamily: 'var:font-body', fontSize: '.875rem', lineHeight: 1.425, fontWeight: 400, letterSpacing: '.0178571429em' },
      button: { fontFamily: 'var:font-body', fontSize: '.875rem', lineHeight: 2.6, fontWeight: 500, letterSpacing: '.0892857143em', textTransform: 'uppercase' },
      caption: { fontFamily: 'var:font-body', fontSize: '.75rem', lineHeight: 1.667, fontWeight: 400, letterSpacing: '.0333333333em' },
      overline: { fontFamily: 'var:font-body', fontSize: '.75rem', lineHeight: 2.667, fontWeight: 500, letterSpacing: '.1666666667em', textTransform: 'uppercase' },
    },
  },
}
