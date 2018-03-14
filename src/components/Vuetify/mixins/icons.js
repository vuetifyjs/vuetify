/* eslint-disable no-multi-spaces */

// Maps internal Vuetify icon names to actual Material Design icon names.
const ICON_DEFAULTS = {
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

/*
// Maps internal Vuetify icon names to actual Font-Awesome icon names.
const ICON_MAP_FA = {
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
*/

export default function icons (icons = {}) {
  return Object.assign({}, ICON_DEFAULTS, icons)
}
