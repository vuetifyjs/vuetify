// @unocss-include
// Composables
import { VClassIcon } from '@/composables/icons'

// Utilities
import { h } from 'vue'

import { aliases as mdiAliases } from './mdi-svg'

// Types
import type { IconAliases, IconSet } from '@/composables/icons'

const aliases: IconAliases = {
  collapse: 'i-lucide:chevron-up',
  complete: 'i-lucide:check',
  cancel: 'i-lucide:circle-x',
  close: 'i-lucide:x',
  delete: 'i-lucide:circle-x', // delete (e.g. v-chip close)
  clear: 'i-lucide:circle-x',
  success: 'i-lucide:circle-check-big',
  info: 'i-lucide:info',
  warning: 'i-lucide:triangle-alert',
  error: 'i-lucide:circle-x',
  prev: 'i-lucide:chevron-left',
  next: 'i-lucide:chevron-right',
  checkboxOn: 'i-lucide:square-check',
  checkboxOff: 'i-lucide:square',
  checkboxIndeterminate: 'i-lucide:square-minus',
  delimiter: mdiAliases.delimiter, // for carousel
  sortAsc: 'i-lucide:arrow-up',
  sortDesc: 'i-lucide:arrow-down',
  expand: 'i-lucide:chevron-down',
  menu: 'i-lucide:menu',
  subgroup: 'i-lucide:chevron-down',
  dropdown: 'i-lucide:chevron-down',
  radioOn: 'i-lucide:circle-check',
  radioOff: 'i-lucide:circle',
  edit: 'i-lucide:pencil',
  ratingEmpty: 'i-lucide:star',
  ratingFull: 'i-lucide:star',
  ratingHalf: 'i-lucide:star-half',
  loading: 'i-lucide:refresh-cw',
  first: 'i-lucide:chevrons-left',
  last: 'i-lucide:chevrons-right',
  unfold: 'i-lucide:unfold-vertical',
  file: 'i-lucide:paperclip',
  plus: 'i-lucide:plus',
  minus: 'i-lucide:minus',
  calendar: 'i-lucide:calendar',
  treeviewCollapse: 'i-lucide:chevron-down',
  treeviewExpand: 'i-lucide:chevron-right',
  tableGroupExpand: 'i-lucide:chevron-right',
  tableGroupCollapse: 'i-lucide:chevron-down',
  eyeDropper: 'i-lucide:pipette',
  upload: 'i-lucide:cloud-upload',
  color: 'i-lucide:palette',
  command: 'i-lucide:command',
  ctrl: 'i-lucide:chevron-up',
  space: 'i-lucide:space',
  shift: 'i-lucide:arrow-big-up',
  alt: 'i-lucide:option',
  enter: 'i-lucide:corner-down-left',
  arrowup: 'i-lucide:arrow-up',
  arrowdown: 'i-lucide:arrow-down',
  arrowleft: 'i-lucide:arrow-left',
  arrowright: 'i-lucide:arrow-right',
  backspace: 'i-lucide:delete',
  play: 'i-lucide:play',
  pause: 'i-lucide:pause',
  fullscreen: 'i-lucide:maximize',
  fullscreenExit: 'i-lucide:minimize',
  volumeHigh: 'i-lucide:volume-2',
  volumeMedium: 'i-lucide:volume-1',
  volumeLow: 'i-lucide:volume',
  volumeOff: 'i-lucide:volume-x',
  search: 'i-lucide:search',
}

const lucide: IconSet = {
  component: (props: any) => h(VClassIcon, { ...props, class: 'lucide' }),
}

export { aliases, lucide }
