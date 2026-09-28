// @unocss-include
// Composables
import { VClassIcon } from '@/composables/icons'

// Utilities
import { h } from 'vue'

// Types
import type { IconAliases, IconSet } from '@/composables/icons'

const aliases: IconAliases = {
  collapse: 'i-tabler:chevron-up',
  complete: 'i-tabler:check',
  cancel: 'i-tabler:circle-x',
  close: 'i-tabler:x',
  delete: 'i-tabler:circle-x', // delete (e.g. v-chip close)
  clear: 'i-tabler:circle-x',
  success: 'i-tabler:circle-check',
  info: 'i-tabler:info-circle',
  warning: 'i-tabler:alert-circle',
  error: 'i-tabler:circle-x',
  prev: 'i-tabler:chevron-left',
  next: 'i-tabler:chevron-right',
  checkboxOn: 'i-tabler:square-check',
  checkboxOff: 'i-tabler:square',
  checkboxIndeterminate: 'i-tabler:square-minus',
  delimiter: 'i-tabler:circle-filled', // for carousel
  sortAsc: 'i-tabler:arrow-up',
  sortDesc: 'i-tabler:arrow-down',
  expand: 'i-tabler:chevron-down',
  menu: 'i-tabler:menu-2',
  subgroup: 'i-tabler:caret-down',
  dropdown: 'i-tabler:caret-down',
  radioOn: 'i-tabler:circle-check',
  radioOff: 'i-tabler:circle',
  edit: 'i-tabler:pencil',
  ratingEmpty: 'i-tabler:star',
  ratingFull: 'i-tabler:star-filled',
  ratingHalf: 'i-tabler:star-half-filled',
  loading: 'i-tabler:refresh',
  first: 'i-tabler:chevrons-left',
  last: 'i-tabler:chevrons-right',
  unfold: 'i-tabler:arrows-vertical',
  file: 'i-tabler:paperclip',
  plus: 'i-tabler:plus',
  minus: 'i-tabler:minus',
  calendar: 'i-tabler:calendar',
  treeviewCollapse: 'i-tabler:chevron-down',
  treeviewExpand: 'i-tabler:chevron-right',
  tableGroupExpand: 'i-tabler:chevron-right',
  tableGroupCollapse: 'i-tabler:chevron-down',
  eyeDropper: 'i-tabler:color-picker',
  upload: 'i-tabler:cloud-upload',
  color: 'i-tabler:palette',
  command: 'i-tabler:command',
  ctrl: 'i-tabler:arrow-back',
  space: 'i-tabler:space',
  shift: 'i-tabler:arrow-big-up',
  alt: 'i-tabler:alt',
  enter: 'i-tabler:corner-down-left',
  arrowup: 'i-tabler:arrow-up',
  arrowdown: 'i-tabler:arrow-down',
  arrowleft: 'i-tabler:arrow-left',
  arrowright: 'i-tabler:arrow-right',
  backspace: 'i-tabler:backspace',
  play: 'i-tabler:player-play',
  pause: 'i-tabler:player-pause',
  fullscreen: 'i-tabler:arrows-maximize',
  fullscreenExit: 'i-tabler:arrows-minimize',
  volumeHigh: 'i-tabler:volume',
  volumeMedium: 'i-tabler:volume-2',
  volumeLow: 'i-tabler:volume-3',
  volumeOff: 'i-tabler:volume-off',
  search: 'i-tabler:search',
}

const tabler: IconSet = {
  component: (props: any) => h(VClassIcon, { ...props, class: 'tabler' }),
}

export { aliases, tabler }
