// @unocss-include
// Composables
import { VClassIcon } from '@/composables/icons'

// Utilities
import { h } from 'vue'

import { aliases as mdiAliases } from './mdi-svg'

// Types
import type { IconAliases, IconSet } from '@/composables/icons'

const aliases: IconAliases = {
  collapse: 'i-carbon:chevron-up',
  complete: 'i-carbon:checkmark',
  cancel: 'i-carbon:close-filled',
  close: 'i-carbon:close',
  delete: 'i-carbon:close-filled', // delete (e.g. v-chip close)
  clear: 'i-carbon:close-filled',
  success: 'i-carbon:checkmark-filled',
  info: 'i-carbon:information',
  warning: 'i-carbon:warning',
  error: 'i-carbon:misuse',
  prev: 'i-carbon:chevron-left',
  next: 'i-carbon:chevron-right',
  checkboxOn: 'i-carbon:checkbox-checked',
  checkboxOff: 'i-carbon:checkbox',
  checkboxIndeterminate: 'i-carbon:checkbox-indeterminate',
  delimiter: 'i-carbon:circle-filled', // for carousel
  sortAsc: 'i-carbon:arrow-up',
  sortDesc: 'i-carbon:arrow-down',
  expand: 'i-carbon:chevron-down',
  menu: 'i-carbon:menu',
  subgroup: 'i-carbon:caret-down',
  dropdown: 'i-carbon:caret-down',
  radioOn: 'i-carbon:radio-button-checked',
  radioOff: 'i-carbon:radio-button',
  edit: 'i-carbon:edit',
  ratingEmpty: 'i-carbon:star',
  ratingFull: 'i-carbon:star-filled',
  ratingHalf: 'i-carbon:star-half',
  loading: 'i-carbon:renew',
  first: 'i-carbon:page-first',
  last: 'i-carbon:page-last',
  unfold: mdiAliases.unfold,
  file: 'i-carbon:attachment',
  plus: 'i-carbon:add',
  minus: 'i-carbon:subtract',
  calendar: 'i-carbon:calendar',
  treeviewCollapse: 'i-carbon:chevron-down',
  treeviewExpand: 'i-carbon:chevron-right',
  tableGroupExpand: 'i-carbon:chevron-right',
  tableGroupCollapse: 'i-carbon:chevron-down',
  eyeDropper: mdiAliases.eyeDropper,
  upload: 'i-carbon:cloud-upload',
  color: 'i-carbon:color-palette',
  command: 'i-carbon:mac-command',
  ctrl: mdiAliases.ctrl,
  space: mdiAliases.space,
  shift: 'i-carbon:mac-shift',
  alt: 'i-carbon:mac-option',
  enter: 'i-carbon:return',
  arrowup: 'i-carbon:arrow-up',
  arrowdown: 'i-carbon:arrow-down',
  arrowleft: 'i-carbon:arrow-left',
  arrowright: 'i-carbon:arrow-right',
  backspace: 'i-carbon:undo',
  play: 'i-carbon:play',
  pause: 'i-carbon:pause',
  fullscreen: 'i-carbon:maximize',
  fullscreenExit: 'i-carbon:minimize',
  volumeHigh: 'i-carbon:volume-up',
  volumeMedium: 'i-carbon:volume-down',
  volumeLow: 'i-carbon:volume-down',
  volumeOff: 'i-carbon:volume-mute',
  search: 'i-carbon:search',
}

const carbon: IconSet = {
  component: (props: any) => h(VClassIcon, { ...props, class: 'carbon' }),
}

export { aliases, carbon }
