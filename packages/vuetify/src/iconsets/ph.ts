// @unocss-include
// Composables
import { VClassIcon } from '@/composables/icons'

// Utilities
import { h } from 'vue'

import { aliases as mdiAliases } from './mdi-svg'

// Types
import type { IconAliases, IconSet } from '@/composables/icons'

const aliases: IconAliases = {
  collapse: 'i-ph:caret-up',
  complete: 'i-ph:check',
  cancel: 'i-ph:x-circle',
  close: 'i-ph:x',
  delete: 'i-ph:x-circle', // delete (e.g. v-chip close)
  clear: 'i-ph:x-circle',
  success: 'i-ph:check-circle',
  info: 'i-ph:info',
  warning: 'i-ph:warning',
  error: 'i-ph:x-circle',
  prev: 'i-ph:caret-left',
  next: 'i-ph:caret-right',
  checkboxOn: 'i-ph:check-square',
  checkboxOff: 'i-ph:square',
  checkboxIndeterminate: 'i-ph:minus-square',
  delimiter: 'i-ph:circle-fill', // for carousel
  sortAsc: 'i-ph:arrow-up',
  sortDesc: 'i-ph:arrow-down',
  expand: 'i-ph:caret-down',
  menu: 'i-ph:list',
  subgroup: 'i-ph:caret-down',
  dropdown: 'i-ph:caret-down',
  radioOn: 'i-ph:radio-button-fill',
  radioOff: 'i-ph:circle',
  edit: 'i-ph:pencil',
  ratingEmpty: 'i-ph:star',
  ratingFull: 'i-ph:star-fill',
  ratingHalf: 'i-ph:star-half-fill',
  loading: 'i-ph:arrows-clockwise',
  first: 'i-ph:caret-double-left',
  last: 'i-ph:caret-double-right',
  unfold: 'i-ph:arrows-out-line-vertical',
  file: 'i-ph:paperclip',
  plus: 'i-ph:plus',
  minus: 'i-ph:minus',
  calendar: 'i-ph:calendar',
  treeviewCollapse: 'i-ph:caret-down',
  treeviewExpand: 'i-ph:caret-right',
  tableGroupExpand: 'i-ph:caret-right',
  tableGroupCollapse: 'i-ph:caret-down',
  eyeDropper: 'i-ph:eyedropper',
  upload: 'i-ph:cloud-arrow-up',
  color: 'i-ph:palette',
  command: 'i-ph:command',
  ctrl: 'i-ph:control',
  space: mdiAliases.space,
  shift: 'i-ph:arrow-fat-up',
  alt: 'i-ph:option',
  enter: 'i-ph:key-return',
  arrowup: 'i-ph:arrow-up',
  arrowdown: 'i-ph:arrow-down',
  arrowleft: 'i-ph:arrow-left',
  arrowright: 'i-ph:arrow-right',
  backspace: 'i-ph:backspace',
  play: 'i-ph:play',
  pause: 'i-ph:pause',
  fullscreen: 'i-ph:arrows-out-simple',
  fullscreenExit: 'i-ph:arrows-in-simple',
  volumeHigh: 'i-ph:speaker-high',
  volumeMedium: 'i-ph:speaker-simple-high',
  volumeLow: 'i-ph:speaker-low',
  volumeOff: 'i-ph:speaker-x',
  search: 'i-ph:magnifying-glass',
}

const ph: IconSet = {
  component: (props: any) => h(VClassIcon, { ...props, class: 'ph' }),
}

export { aliases, ph }
