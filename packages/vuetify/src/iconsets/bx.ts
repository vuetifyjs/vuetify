// @unocss-include
// Composables
import { VClassIcon } from '@/composables/icons'

// Utilities
import { h } from 'vue'

import { aliases as mdiAliases } from './mdi-svg'

// Types
import type { IconAliases, IconSet } from '@/composables/icons'

const aliases: IconAliases = {
  collapse: 'i-bx:chevron-up',
  complete: 'i-bx:check',
  cancel: 'i-bx:x-circle',
  close: 'i-bx:x',
  delete: 'i-bx:x-circle', // delete (e.g. v-chip close)
  clear: 'i-bx:x-circle',
  success: 'i-bx:check-circle',
  info: 'i-bx:info-circle',
  warning: 'i-bx:error-circle',
  error: 'i-bx:x-circle',
  prev: 'i-bx:chevron-left',
  next: 'i-bx:chevron-right',
  checkboxOn: 'i-bx:checkbox-checked',
  checkboxOff: 'i-bx:checkbox',
  checkboxIndeterminate: 'i-bx:checkbox-minus',
  delimiter: 'i-bx:bxs-circle', // for carousel
  sortAsc: 'i-bx:sort-up',
  sortDesc: 'i-bx:sort-down',
  expand: 'i-bx:chevron-down',
  menu: 'i-bx:menu',
  subgroup: 'i-bx:caret-down',
  dropdown: 'i-bx:caret-down',
  radioOn: 'i-bx:radio-circle-marked',
  radioOff: 'i-bx:radio-circle',
  edit: 'i-bx:pencil',
  ratingEmpty: 'i-bx:star',
  ratingFull: 'i-bx:bxs-star',
  ratingHalf: 'i-bx:bxs-star-half',
  loading: 'i-bx:refresh',
  first: 'i-bx:first-page',
  last: 'i-bx:last-page',
  unfold: 'i-bx:expand-vertical',
  file: 'i-bx:paperclip',
  plus: 'i-bx:plus',
  minus: 'i-bx:minus',
  calendar: 'i-bx:calendar',
  treeviewCollapse: 'i-bx:chevron-down',
  treeviewExpand: 'i-bx:chevron-right',
  tableGroupExpand: 'i-bx:chevron-right',
  tableGroupCollapse: 'i-bx:chevron-down',
  eyeDropper: 'i-bx:bxs-eyedropper',
  upload: 'i-bx:cloud-upload',
  color: 'i-bx:palette',
  command: 'i-bx:command',
  ctrl: 'i-bx:chevron-up',
  space: 'i-bx:space-bar',
  shift: 'i-bx:up-arrow-alt',
  alt: mdiAliases.alt,
  enter: mdiAliases.enter,
  arrowup: 'i-bx:up-arrow-alt',
  arrowdown: 'i-bx:down-arrow-alt',
  arrowleft: 'i-bx:left-arrow-alt',
  arrowright: 'i-bx:right-arrow-alt',
  backspace: 'i-bx:undo',
  play: 'i-bx:play',
  pause: 'i-bx:pause',
  fullscreen: 'i-bx:fullscreen',
  fullscreenExit: 'i-bx:exit-fullscreen',
  volumeHigh: 'i-bx:volume-full',
  volumeMedium: 'i-bx:volume',
  volumeLow: 'i-bx:volume-low',
  volumeOff: 'i-bx:volume-mute',
  search: 'i-bx:search',
}

const bx: IconSet = {
  component: (props: any) => h(VClassIcon, { ...props, class: 'bx' }),
}

export { aliases, bx }
