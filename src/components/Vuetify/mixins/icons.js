// Maps internal Vuetify icon names to actual Material Design icon names.
const ICONS_MATERIAL = {
  'cancel': 'cancel',
  'close': 'close',
  'delete': 'cancel', // delete (e.g. v-chip close)
  'clear': 'clear',
  'success': 'check_circle',
  'info': 'info',
  'warning': 'priority_high',
  'error': 'warning',
  'prev': 'chevron_left',
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
  'clear': 'mdi-close',
  'success': 'mdi-check-circle',
  'info': 'mdi-information',
  'warning': 'mdi-exclamation',
  'error': 'mdi-alert',
  'prev': 'mdi-chevron-left',
  'next': 'mdi-chevron-right',
  'checked': 'mdi-checkbox-marked',
  'unchecked': 'mdi-checkbox-blank-outline',
  'indeterminate': 'mdi-minus-box',
  'dot': 'mdi-circle', // for carousel
  'sort': 'mdi-arrow-up',
  'expand': 'mdi-chevron-down',
  'append': 'mdi-chevron-down',
  'subgroup': 'mdi-menu-down',
  'rchecked': 'mdi-radiobox-marked',
  'runchecked': 'mdi-radiobox-blank',
  'edit': 'mdi-pencil'
}

// Maps internal Vuetify icon names to actual Font-Awesome 4 icon names.
const ICONS_FONTAWESOME4 = {
  'cancel': 'fa fa-times-circle',
  'close': 'fa fa-times',
  'delete': 'fa fa-times-circle', // delete (e.g. v-chip close)
  'clear': 'fa fa-times-circle', // delete (e.g. v-chip close)
  'success': 'fa fa-check-circle',
  'info': 'fa fa-info-circle',
  'warning': 'fa fa-exclamation',
  'error': 'fa fa-exclamation-triangle',
  'prev': 'fa fa-chevron-left',
  'next': 'fa fa-chevron-right',
  'checked': 'fa fa-check-square',
  'unchecked': 'fa fa-square-o', // note 'far'
  'indeterminate': 'fa fa-minus-square',
  'dot': 'fa fa-circle', // for carousel
  'sort': 'fa fa-sort-up',
  'expand': 'fa fa-chevron-down',
  'append': 'fa fa-chevron-down',
  'subgroup': 'fa fa-caret-down',
  'rchecked': 'fa fa-dot-circle',
  'runchecked': 'fa fa-circle-o',
  'edit': 'fa fa-pencil'
}

// Maps internal Vuetify icon names to actual Font-Awesome 5+ icon names.
const ICONS_FONTAWESOME = {
  'cancel': 'fas fa-times-circle',
  'close': 'fas fa-times',
  'delete': 'fas fa-times-circle', // delete (e.g. v-chip close)
  'clear': 'fas fa-times-circle', // delete (e.g. v-chip close)
  'success': 'fas fa-check-circle',
  'info': 'fas fa-info-circle',
  'warning': 'fas fa-exclamation',
  'error': 'fas fa-exclamation-triangle',
  'prev': 'fas fa-chevron-left',
  'next': 'fas fa-chevron-right',
  'checked': 'fas fa-check-square',
  'unchecked': 'far fa-square', // note 'far'
  'indeterminate': 'fas fa-minus-square',
  'dot': 'fas fa-circle', // for carousel
  'sort': 'fas fa-sort-up',
  'expand': 'fas fa-chevron-down',
  'append': 'fas fa-chevron-down',
  'subgroup': 'fas fa-caret-down',
  'rchecked': 'far fa-dot-circle',
  'runchecked': 'far fa-circle',
  'edit': 'fas fa-edit'
}

const iconSets = {
  md: ICONS_MATERIAL,
  mdi: ICONS_MDI,
  fa: ICONS_FONTAWESOME,
  fa4: ICONS_FONTAWESOME4
}

export default function icons (iconfont = 'md', icons = {}) {
  return Object.assign({}, iconSets[iconfont] || iconSets.md, icons)
}
