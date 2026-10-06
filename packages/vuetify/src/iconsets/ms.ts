// @unocss-include
// Composables
import { VClassIcon } from '@/composables/icons'

// Utilities
import { h } from 'vue'

// Types
import type { IconAliases, IconSet } from '@/composables/icons'

const aliases: IconAliases = {
  collapse: 'i-material-symbols:keyboard-arrow-up',
  complete: 'i-material-symbols:check',
  cancel: 'i-material-symbols:cancel',
  close: 'i-material-symbols:close',
  delete: 'i-material-symbols:cancel', // delete (e.g. v-chip close)
  clear: 'i-material-symbols:cancel',
  success: 'i-material-symbols:check-circle',
  info: 'i-material-symbols:info',
  warning: 'i-material-symbols:warning',
  error: 'i-material-symbols:error',
  prev: 'i-material-symbols:chevron-left',
  next: 'i-material-symbols:chevron-right',
  checkboxOn: 'i-material-symbols:check-box',
  checkboxOff: 'i-material-symbols:check-box-outline-blank',
  checkboxIndeterminate: 'i-material-symbols:indeterminate-check-box',
  delimiter: 'i-material-symbols:circle', // for carousel
  sortAsc: 'i-material-symbols:arrow-upward',
  sortDesc: 'i-material-symbols:arrow-downward',
  expand: 'i-material-symbols:keyboard-arrow-down',
  menu: 'i-material-symbols:menu',
  subgroup: 'i-material-symbols:arrow-drop-down',
  dropdown: 'i-material-symbols:arrow-drop-down',
  radioOn: 'i-material-symbols:radio-button-checked',
  radioOff: 'i-material-symbols:radio-button-unchecked',
  edit: 'i-material-symbols:edit',
  ratingEmpty: 'i-material-symbols:star-outline',
  ratingFull: 'i-material-symbols:star',
  ratingHalf: 'i-material-symbols:star-half',
  loading: 'i-material-symbols:cached',
  first: 'i-material-symbols:first-page',
  last: 'i-material-symbols:last-page',
  unfold: 'i-material-symbols:unfold-more',
  file: 'i-material-symbols:attach-file',
  plus: 'i-material-symbols:add',
  minus: 'i-material-symbols:remove',
  calendar: 'i-material-symbols:calendar-today',
  treeviewCollapse: 'i-material-symbols:arrow-drop-down',
  treeviewExpand: 'i-material-symbols:arrow-right',
  tableGroupExpand: 'i-material-symbols:chevron-right',
  tableGroupCollapse: 'i-material-symbols:keyboard-arrow-down',
  eyeDropper: 'i-material-symbols:colorize',
  upload: 'i-material-symbols:upload',
  color: 'i-material-symbols:palette',
  command: 'i-material-symbols:keyboard-command-key',
  ctrl: 'i-material-symbols:keyboard-control-key',
  space: 'i-material-symbols:space-bar',
  shift: 'i-material-symbols:shift',
  alt: 'i-material-symbols:keyboard-option-key',
  enter: 'i-material-symbols:keyboard-return',
  arrowup: 'i-material-symbols:arrow-upward',
  arrowdown: 'i-material-symbols:arrow-downward',
  arrowleft: 'i-material-symbols:arrow-back',
  arrowright: 'i-material-symbols:arrow-forward',
  backspace: 'i-material-symbols:backspace-outline',
  play: 'i-material-symbols:play-arrow',
  pause: 'i-material-symbols:pause',
  fullscreen: 'i-material-symbols:fullscreen',
  fullscreenExit: 'i-material-symbols:fullscreen-exit',
  volumeHigh: 'i-material-symbols:volume-up',
  volumeMedium: 'i-material-symbols:volume-down',
  volumeLow: 'i-material-symbols:volume-mute',
  volumeOff: 'i-material-symbols:volume-off',
  search: 'i-material-symbols:search',
}

const ms: IconSet = {
  component: (props: any) => h(VClassIcon, { ...props, class: 'ms' }),
}

export { aliases, ms }
