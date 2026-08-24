// Composables
import { VClassIcon } from '@/composables/icons'

// Utilities
import { h } from 'vue'

// Types
import type { IconAliases, IconSet } from '@/composables/icons'

const aliases: IconAliases = {
  collapse: 'mdi-chevron-up',
  complete: 'mdi-check',
  cancel: 'mdi-close-circle',
  close: 'mdi-close',
  delete: 'mdi-close-circle', // delete (e.g. v-chip close)
  clear: 'mdi-close-circle',
  success: 'mdi-check-circle',
  info: 'mdi-information',
  warning: 'mdi-alert-circle',
  error: 'mdi-close-circle',
  prev: 'mdi-chevron-left',
  next: 'mdi-chevron-right',
  checkboxOn: 'mdi-checkbox-marked',
  checkboxOff: 'mdi-checkbox-blank-outline',
  checkboxIndeterminate: 'mdi-minus-box',
  clock: 'mdi-clock',
  delimiter: 'mdi-circle', // for carousel
  sortAsc: 'mdi-arrow-up',
  sortDesc: 'mdi-arrow-down',
  expand: 'mdi-chevron-down',
  menu: 'mdi-menu',
  subgroup: 'mdi-menu-down',
  dropdown: 'mdi-menu-down',
  radioOn: 'mdi-radiobox-marked',
  radioOff: 'mdi-radiobox-blank',
  edit: 'mdi-pencil',
  ratingEmpty: 'mdi-star-outline',
  ratingFull: 'mdi-star',
  ratingHalf: 'mdi-star-half-full',
  loading: 'mdi-cached',
  first: 'mdi-page-first',
  last: 'mdi-page-last',
  unfold: 'mdi-unfold-more-horizontal',
  file: 'mdi-paperclip',
  plus: 'mdi-plus',
  minus: 'mdi-minus',
  calendar: 'mdi-calendar',
  treeviewCollapse: 'mdi-menu-down',
  treeviewExpand: 'mdi-menu-right',
  tableGroupCollapse: 'mdi-chevron-down',
  tableGroupExpand: 'mdi-chevron-right',
  eyeDropper: 'mdi-eyedropper',
  upload: 'mdi-cloud-upload',
  color: 'mdi-palette',
  command: 'mdi-apple-keyboard-command',
  ctrl: 'mdi-apple-keyboard-control',
  space: 'mdi-keyboard-space',
  shift: 'mdi-apple-keyboard-shift',
  alt: 'mdi-apple-keyboard-option',
  enter: 'mdi-keyboard-return',
  arrowup: 'mdi-arrow-up',
  arrowdown: 'mdi-arrow-down',
  arrowleft: 'mdi-arrow-left',
  arrowright: 'mdi-arrow-right',
  backspace: 'mdi-backspace',
  play: 'mdi-play',
  pause: 'mdi-pause',
  fullscreen: 'mdi-fullscreen',
  fullscreenExit: 'mdi-fullscreen-exit',
  volumeHigh: 'mdi-volume-high',
  volumeMedium: 'mdi-volume-medium',
  volumeLow: 'mdi-volume-low',
  volumeOff: 'mdi-volume-variant-off',
  search: 'mdi-magnify',
}

const mdi: IconSet = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (props: any) => h(VClassIcon, { ...props, class: 'mdi' }),
}

export { aliases, mdi }
