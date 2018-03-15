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
  prefix: ['mdi_', 'mdi-'],
  placement: 'class' // 'class', 'data-icon' or 'text' for inner text content
}

// Maps internal Vuetify icon names to actual Font-Awesome icon names.
const ICONS_FONTAWESOME = {
  'cancel': 'times-circle',
  'close': 'times-circle',
  'delete': 'times',  // delete (e.g. v-chip close)
  'success': 'check-circle',
  'info': 'info-circle',
  'warning': 'exclamation',
  'error': 'exclamation-triangle',
  'previous': 'chevron-left',
  'next': 'chevron-right',
  'checked': 'check-square',
  'unchecked': 'square',
  'indeterminate': 'minus-square',
  'dot': 'circle',   // for carousel
  'sort': 'sort-up',
  'expand': 'chevron-down',
  'append': 'keyboard_arrow_down',
  'subgroup': 'caret-down'
}

// Provides iconfont meta configuration for Material Design icons.
const ICONFONT_FONTAWESOME = {
  name: 'Font Awesome',
  iconType: 'fa',
  prefix: ['fa-', 'fas-', 'far-', 'fab-'],
  placement: 'text' // 'class', 'data-icon' or 'text' for inner text content
}

export default function icons (iconfont = {}, icons = {}) {
  let ICONFONT_DEFAULT = ICONFONT_MATERIAL
  let ICONS_DEFAULT = ICONS_MATERIAL
  if (iconfont.name && iconfont.name === 'Font Awesome') {
    ICONFONT_DEFAULT = ICONFONT_FONTAWESOME
    ICONS_DEFAULT = ICONS_FONTAWESOME
  }

  let combinedIcons = Object.assign({}, ICONS_DEFAULT, icons)
  combinedIcons.iconfont = Object.assign({},  ICONFONT_DEFAULT, iconfont)
  return combinedIcons
}
