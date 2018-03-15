/* eslint-disable no-multi-spaces */

// Maps internal Vuetify icon names to actual Material Design icon names.
const ICONS_MATERIAL = {
  'cancel': 'cancel',
  'close': 'cancel',
  'delete': 'close',  // delete (e.g. v-chip close)
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
  'subgroup': 'arrow_drop_down'
}

// Provides iconfont meta configuration for Material Design icons.
const ICONFONT_MATERIAL = {
  name: 'Material Design',
  iconType: 'material-design',
  prefix: ['mdi', 'mdi_', 'mdi-'],
  placement: 'class' // 'class', 'data-icon' or 'text' for inner text content
}

// Maps internal Vuetify icon names to actual Font-Awesome icon names.
const ICONS_FONTAWESOME = {
  'cancel': 'fas fa-times-circle',
  'close': 'fas fa-times-circle',
  'delete': 'fas fa-times',  // delete (e.g. v-chip close)
  'success': 'fas fa-check-circle',
  'info': 'fas fa-info-circle',
  'warning': 'fas fa-exclamation',
  'error': 'fas fa-exclamation-triangle',
  'previous': 'fas fa-chevron-left',
  'next': 'fas fa-chevron-right',
  'checked': 'fas fa-check-square',
  'unchecked': 'far fa-square', // note 'far'
  'indeterminate': 'fas fa-minus-square',
  'dot': 'fas fa-circle',   // for carousel
  'sort': 'fas fa-sort-up',
  'expand': 'fas fa-chevron-down',
  'append': 'fas fa-keyboard_arrow_down',
  'subgroup': 'fas fa-caret-down'
}

// Provides iconfont meta configuration for Material Design icons.
const ICONFONT_FONTAWESOME = {
  name: 'Font Awesome',
  iconType: 'fa',
  prefix: ['fa', 'fas', 'far', 'fal', 'fab'],
  placement: '' // '' (auto), 'class', 'data-icon' or 'text' for inner text content
}

export default function icons (iconfont = {}, icons = {}) {
  let iconfontToUse = ICONFONT_MATERIAL
  let iconsToUse = ICONS_MATERIAL
  if ((iconfont.name && iconfont.name === 'Font Awesome') ||
      (iconfont.iconType && iconfont.iconType === 'fa')) {
    iconfontToUse = ICONFONT_FONTAWESOME
    iconsToUse = ICONS_FONTAWESOME
  }

  let combinedIcons = Object.assign({}, iconsToUse, icons)
  combinedIcons.iconfont = Object.assign({},  iconfontToUse, iconfont)
  return combinedIcons
}
