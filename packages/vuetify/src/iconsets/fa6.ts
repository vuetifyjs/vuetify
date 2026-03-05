// @unocss-include
// Composables
import { VClassIcon } from '@/composables/icons'

// Utilities
import { h } from 'vue'

import { aliases as mdiAliases } from './mdi-svg'

// Types
import type { IconAliases, IconSet } from '@/composables/icons'

const aliases: IconAliases = {
  collapse: 'i-fa6-solid:chevron-up',
  complete: 'i-fa6-solid:check',
  cancel: 'i-fa6-solid:circle-xmark',
  close: 'i-fa6-solid:xmark',
  delete: 'i-fa6-solid:circle-xmark', // delete (e.g. v-chip close)
  clear: 'i-fa6-solid:circle-xmark',
  success: 'i-fa6-solid:circle-check',
  info: 'i-fa6-solid:circle-info',
  warning: 'i-fa6-solid:triangle-exclamation',
  error: 'i-fa6-solid:circle-xmark',
  prev: 'i-fa6-solid:chevron-left',
  next: 'i-fa6-solid:chevron-right',
  checkboxOn: 'i-fa6-solid:square-check',
  checkboxOff: 'i-fa6-regular:square',
  checkboxIndeterminate: 'i-fa6-solid:square-minus',
  delimiter: 'i-fa6-solid:circle', // for carousel
  sortAsc: 'i-fa6-solid:arrow-up',
  sortDesc: 'i-fa6-solid:arrow-down',
  expand: 'i-fa6-solid:chevron-down',
  menu: 'i-fa6-solid:bars',
  subgroup: 'i-fa6-solid:caret-down',
  dropdown: 'i-fa6-solid:caret-down',
  radioOn: 'i-fa6-regular:circle-dot',
  radioOff: 'i-fa6-regular:circle',
  edit: 'i-fa6-solid:pencil',
  ratingEmpty: 'i-fa6-regular:star',
  ratingFull: 'i-fa6-solid:star',
  ratingHalf: 'i-fa6-solid:star-half-stroke',
  loading: 'i-fa6-solid:arrows-rotate',
  first: 'i-fa6-solid:angles-left',
  last: 'i-fa6-solid:angles-right',
  unfold: 'i-fa6-solid:up-down',
  file: 'i-fa6-solid:paperclip',
  plus: 'i-fa6-solid:plus',
  minus: 'i-fa6-solid:minus',
  calendar: 'i-fa6-regular:calendar',
  treeviewCollapse: 'i-fa6-solid:caret-down',
  treeviewExpand: 'i-fa6-solid:caret-right',
  tableGroupExpand: 'i-fa6-solid:chevron-right',
  tableGroupCollapse: 'i-fa6-solid:chevron-down',
  eyeDropper: 'i-fa6-solid:eye-dropper',
  upload: 'i-fa6-solid:cloud-arrow-up',
  color: 'i-fa6-solid:palette',
  command: mdiAliases.command,
  ctrl: mdiAliases.ctrl,
  space: mdiAliases.space,
  shift: 'i-fa6-solid:up-long',
  alt: mdiAliases.alt,
  enter: mdiAliases.enter,
  arrowup: 'i-fa6-solid:arrow-up',
  arrowdown: 'i-fa6-solid:arrow-down',
  arrowleft: 'i-fa6-solid:arrow-left',
  arrowright: 'i-fa6-solid:arrow-right',
  backspace: 'i-fa6-solid:delete-left',
  play: 'i-fa6-solid:play',
  pause: 'i-fa6-solid:pause',
  fullscreen: 'i-fa6-solid:maximize',
  fullscreenExit: 'i-fa6-solid:minimize',
  volumeHigh: 'i-fa6-solid:volume-high',
  volumeMedium: 'i-fa6-solid:volume-low',
  volumeLow: 'i-fa6-solid:volume-off',
  volumeOff: 'i-fa6-solid:volume-xmark',
  search: 'i-fa6-solid:magnifying-glass',
}

const fa6: IconSet = {
  component: (props: any) => h(VClassIcon, { ...props, class: 'fa6' }),
}

export { aliases, fa6 }
