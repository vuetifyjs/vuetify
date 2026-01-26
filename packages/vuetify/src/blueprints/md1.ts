/* eslint-disable max-len */
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
      class: 'text-uppercase',
      color: 'primary',
      rounded: 0,
    },
    VCheckbox: {
      color: 'secondary',
      indentDetails: false,
    },
    VCombobox: {
      variant: 'underlined',
    },
    VDatePicker: {
      color: 'primary',
      controlHeight: 44,
      elevation: 1,
      rounded: 0,
      controlVariant: 'modal',

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
      indentDetails: false,
    },
    VSwitch: {
      indentDetails: false,
    },
    VRadioGroup: {
      indentDetails: false,
    },
    VRangeSlider: {
      indentDetails: false,
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
  typography: {
    merge: false,
    variables: {
      'font-heading': '"Roboto", sans-serif',
      'font-body': '"Roboto", sans-serif',

      'display-large': 'var:display-2-*',
      'headline-large': 'var:display-1-*',
      'headline-medium': 'var:headline-*',
      'headline-small': 'var:title-*',
      'title-large': 'var:title-*',
      'body-large': 'var:body-1-*',
      'body-medium': 'var:body-2-*',
      'label-large': 'var:button-*',
      'label-small': 'var:caption-*',
    },
    variants: {
      'display-4': { fontFamily: 'var:font-heading', fontSize: '7rem', lineHeight: 1, fontWeight: 300 },
      'display-3': { fontFamily: 'var:font-heading', fontSize: '3.5rem', lineHeight: 1, fontWeight: 400 },
      'display-2': { fontFamily: 'var:font-heading', fontSize: '2.8125rem', lineHeight: 1.05, fontWeight: 400 },
      'display-1': { fontFamily: 'var:font-heading', fontSize: '2.125rem', lineHeight: 1.175, fontWeight: 400 },
      headline: { fontFamily: 'var:font-heading', fontSize: '1.5rem', lineHeight: 1.333, fontWeight: 400 },
      title: { fontFamily: 'var:font-heading', fontSize: '1.25rem', lineHeight: 1.6, fontWeight: 500 },
      subheading: { fontFamily: 'var:font-body', fontSize: '1rem', lineHeight: 1.75, fontWeight: 400 },
      'body-2': { fontFamily: 'var:font-body', fontSize: '.875rem', lineHeight: 1.5, fontWeight: 400 },
      'body-1': { fontFamily: 'var:font-body', fontSize: '.8125rem', lineHeight: 1.425, fontWeight: 400 },
      button: { fontFamily: 'var:font-body', fontSize: '.875rem', lineHeight: 2.6, fontWeight: 500, textTransform: 'uppercase' },
      caption: { fontFamily: 'var:font-body', fontSize: '.75rem', lineHeight: 1.667, fontWeight: 400 },
    },
  },
}
