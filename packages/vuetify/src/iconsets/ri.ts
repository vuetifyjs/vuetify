// @unocss-include
// Composables
import { VClassIcon } from '@/composables/icons'

// Utilities
import { h } from 'vue'

import { aliases as mdiAliases } from './mdi-svg'

// Types
import type { IconAliases, IconSet } from '@/composables/icons'

const aliases: IconAliases = {
  collapse: 'i-ri:arrow-up-s-line',
  complete: 'i-ri:check-line',
  cancel: 'i-ri:close-circle-line',
  close: 'i-ri:close-line',
  delete: 'i-ri:close-circle-line', // delete (e.g. v-chip close)
  clear: 'i-ri:close-circle-line',
  success: 'i-ri:checkbox-circle-line',
  info: 'i-ri:information-line',
  warning: 'i-ri:alert-line',
  error: 'i-ri:error-warning-line',
  prev: 'i-ri:arrow-left-s-line',
  next: 'i-ri:arrow-right-s-line',
  checkboxOn: 'i-ri:checkbox-fill',
  checkboxOff: 'i-ri:checkbox-line',
  checkboxIndeterminate: 'i-ri:checkbox-indeterminate-line',
  delimiter: 'i-ri:checkbox-blank-circle-fill', // for carousel
  sortAsc: 'i-ri:arrow-up-line',
  sortDesc: 'i-ri:arrow-down-line',
  expand: 'i-ri:arrow-down-s-line',
  menu: 'i-ri:menu-line',
  subgroup: 'i-ri:arrow-down-s-fill',
  dropdown: 'i-ri:arrow-down-s-fill',
  radioOn: 'i-ri:radio-button-fill',
  radioOff: 'i-ri:radio-button-line',
  edit: 'i-ri:pencil-line',
  ratingEmpty: 'i-ri:star-line',
  ratingFull: 'i-ri:star-fill',
  ratingHalf: 'i-ri:star-half-line',
  loading: 'i-ri:refresh-line',
  first: 'i-ri:skip-back-line',
  last: 'i-ri:skip-forward-line',
  unfold: 'i-ri:expand-up-down-line',
  file: 'i-ri:attachment-2',
  plus: 'i-ri:add-line',
  minus: 'i-ri:subtract-line',
  calendar: 'i-ri:calendar-line',
  treeviewCollapse: 'i-ri:arrow-down-s-line',
  treeviewExpand: 'i-ri:arrow-right-s-line',
  tableGroupExpand: 'i-ri:arrow-right-s-line',
  tableGroupCollapse: 'i-ri:arrow-down-s-line',
  eyeDropper: 'i-ri:dropper-line',
  upload: 'i-ri:upload-cloud-line',
  color: 'i-ri:palette-line',
  command: 'i-ri:command-line',
  ctrl: 'i-ri:arrow-up-s-line',
  space: 'i-ri:space',
  shift: 'i-ri:arrow-up-line',
  alt: mdiAliases.alt,
  enter: 'i-ri:corner-down-left-line',
  arrowup: 'i-ri:arrow-up-line',
  arrowdown: 'i-ri:arrow-down-line',
  arrowleft: 'i-ri:arrow-left-line',
  arrowright: 'i-ri:arrow-right-line',
  backspace: 'i-ri:delete-back-2-line',
  play: 'i-ri:play-line',
  pause: 'i-ri:pause-line',
  fullscreen: 'i-ri:fullscreen-line',
  fullscreenExit: 'i-ri:fullscreen-exit-line',
  volumeHigh: 'i-ri:volume-up-line',
  volumeMedium: 'i-ri:volume-down-line',
  volumeLow: 'i-ri:volume-down-line',
  volumeOff: 'i-ri:volume-mute-line',
  search: 'i-ri:search-line',
}

const ri: IconSet = {
  component: (props: any) => h(VClassIcon, { ...props, class: 'ri' }),
}

export { aliases, ri }
