// Maps internal Vuetify icon names to actual Material Design icon names.
const ICONS_MATERIAL = {
  'cancel': 'cancel',
  'close': 'close',
  'delete': 'cancel', // delete (e.g. v-chip close)
  'success': 'check_circle',
  'info': 'info',
  'warning': 'priority_high',
  'error': 'warning',
  'previous': 'chevron_left',
  'next': 'chevron_right',
  'checked': 'check_box',
  'unchecked': 'check_box_outline_blank',
  'indeterminate': 'indeterminate_check_box',
  'dot': 'fiber_manual_record', // for carousel
  'sort': 'arrow_upward',
  'expand': 'keyboard_arrow_down',
  'append': 'keyboard_arrow_down',
  'subgroup': 'arrow_drop_down',
  'rchecked': 'radio_button_checked',
  'runchecked': 'radio_button_unchecked',
  'edit': 'edit'
}

// Maps internal Vuetify icon names to actual icons from materialdesignicons.com
const ICONS_MDI = {
  'cancel': 'mdi-close-circle',
  'close': 'mdi-close',
  'delete': 'mdi-close-circle', // delete (e.g. v-chip close)
  'success': 'mdi-check-circle',
  'info': 'mdi-information',
  'warning': 'mdi-exclamation',
  'error': 'mdi-alert',
  'previous': 'mdi-chevron-left',
  'next': 'mdi-chevron-right',
  'checked': 'mdi-checkbox-marked',
  'unchecked': 'mdi-checkbox-blank-outline',
  'indeterminate': 'mdi-minus-box',
  'dot': 'mdi-circle', // for carousel
  'sort': 'mdi-arrow-up',
  'expand': 'mdi-chevron-down',
  'append': 'mdi-chevron-down',
  'subgroup': 'mdi-menu-down',
  'rchecked': 'radio-button-checked',
  'runchecked': 'radio-button-unchecked',
  'edit': 'pencil'
}

// Maps internal Vuetify icon names to actual Font-Awesome icon names.
const ICONS_FONTAWESOME = {
  'cancel': 'fas fa-times-circle',
  'close': 'fas fa-times',
  'delete': 'fas fa-times-circle', // delete (e.g. v-chip close)
  'success': 'fas fa-check-circle',
  'info': 'fas fa-info-circle',
  'warning': 'fas fa-exclamation',
  'error': 'fas fa-exclamation-triangle',
  'previous': 'fas fa-chevron-left',
  'next': 'fas fa-chevron-right',
  'checked': 'fas fa-check-square',
  'unchecked': 'far fa-square', // note 'far'
  'indeterminate': 'fas fa-minus-square',
  'dot': 'fas fa-circle', // for carousel
  'sort': 'fas fa-sort-up',
  'expand': 'fas fa-chevron-down',
  'append': 'fas fa-keyboard_arrow_down',
  'subgroup': 'fas fa-caret-down',
  'rchecked': 'fas fa-dot-circle',
  'runchecked': 'fas fa-circle',
  'edit': 'fas fa-edit'
}

export default function icons (iconfont = 'md', icons = {}) {
  switch (iconfont.toLowerCase()) {
    case 'fa':
      return Object.assign({}, ICONS_FONTAWESOME, icons)
    case 'mdi':
      return Object.assign({}, ICONS_MDI, icons)
    case 'md':
    default:
      return Object.assign({}, ICONS_MATERIAL, icons)
  }
}
