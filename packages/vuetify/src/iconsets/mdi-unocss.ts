// @unocss-include
// Composables
import { VClassIcon } from '@/composables/icons'

// Utilities
import { h } from 'vue'

// Types
import type { IconAliases, IconSet } from '@/composables/icons'

const aliases: IconAliases = {
  collapse: 'i-mdi:chevron-up',
  complete: 'i-mdi:check',
  cancel: 'i-mdi:close-circle',
  close: 'i-mdi:close',
  // delete (e.g. v-chip close)
  delete: 'i-mdi:close-circle',
  clear: 'i-mdi:close-circle',
  success: 'i-mdi:check-circle',
  info: 'i-mdi:information',
  warning: 'i-mdi:alert-circle',
  error: 'i-mdi:close-circle',
  prev: 'i-mdi:chevron-left',
  next: 'i-mdi:chevron-right',
  checkboxOn: 'i-mdi:checkbox-marked',
  checkboxOff: 'i-mdi:checkbox-blank-outline',
  checkboxIndeterminate: 'i-mdi:minus-box',
  delimiter: 'i-mdi:circle',
  // for carousel
  sortAsc: 'i-mdi:arrow-up',
  sortDesc: 'i-mdi:arrow-down',
  expand: 'i-mdi:chevron-down',
  menu: 'i-mdi:menu',
  subgroup: 'i-mdi:menu-down',
  dropdown: 'i-mdi:menu-down',
  radioOn: 'i-mdi:radiobox-marked',
  radioOff: 'i-mdi:radiobox-blank',
  edit: 'i-mdi:pencil',
  ratingEmpty: 'i-mdi:star-outline',
  ratingFull: 'i-mdi:star',
  ratingHalf: 'i-mdi:star-half-full',
  loading: 'i-mdi:cached',
  first: 'i-mdi:page-first',
  last: 'i-mdi:page-last',
  unfold: 'i-mdi:unfold-more-horizontal',
  file: 'i-mdi:paperclip',
  plus: 'i-mdi:plus',
  minus: 'i-mdi:minus',
  calendar: 'i-mdi:calendar',
  treeviewCollapse: 'i-mdi:menu-down',
  treeviewExpand: 'i-mdi:menu-right',
  tableGroupCollapse: 'i-mdi:chevron-down',
  tableGroupExpand: 'i-mdi:chevron-right',
  eyeDropper: 'i-mdi:eyedropper',
  upload: 'i-mdi:cloud-upload',
  color: 'i-mdi:palette',
  command: 'i-mdi:apple-keyboard-command',
  ctrl: 'i-mdi:apple-keyboard-control',
  space: 'i-mdi:keyboard-space',
  shift: 'i-mdi:apple-keyboard-shift',
  alt: 'i-mdi:apple-keyboard-option',
  enter: 'i-mdi:keyboard-return',
  arrowup: 'i-mdi:arrow-up',
  arrowdown: 'i-mdi:arrow-down',
  arrowleft: 'i-mdi:arrow-left',
  arrowright: 'i-mdi:arrow-right',
  backspace: 'i-mdi:backspace',
  play: 'i-mdi:play',
  pause: 'i-mdi:pause',
  fullscreen: 'i-mdi:fullscreen',
  fullscreenExit: 'i-mdi:fullscreen-exit',
  volumeHigh: 'i-mdi:volume-high',
  volumeMedium: 'i-mdi:volume-medium',
  volumeLow: 'i-mdi:volume-low',
  volumeOff: 'i-mdi:volume-variant-off',
  search: 'i-mdi:magnify',
}

const mdi: IconSet = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (props: any) => h(VClassIcon, { ...props, class: 'mdi' }),
}

export { aliases, mdi }
