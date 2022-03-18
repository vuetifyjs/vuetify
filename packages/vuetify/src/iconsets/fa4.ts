// Utilities
import { h } from 'vue'

// Components
import { VClassIcon } from '@/composables/icons'

// Types
import type { IconAliases, IconSet } from '@/composables/icons'

const aliases: IconAliases = {
  collapse: 'fa-chevron-up',
  complete: 'fa-check',
  cancel: 'fa-times-circle',
  close: 'fa-times',
  delete: 'fa-times-circle', // delete (e.g. v-chip close)
  clear: 'fa-check-circle', // delete (e.g. v-chip close)
  success: 'fa-check-circle',
  info: 'fa-info-circle',
  warning: 'fa-exclamation',
  error: 'fa-exclamation-triangle',
  prev: 'fa-chevron-left',
  next: 'fa-chevron-right',
  checkboxOn: 'fa-check-square',
  checkboxOff: 'fa-square-o',
  checkboxIndeterminate: 'fa-minus-square',
  delimiter: 'fa-circle', // for carousel
  sort: 'fa-sort-up',
  expand: 'fa-chevron-down',
  menu: 'fa-bars',
  treeviewCollapse: 'fa-caret-down',
  treeviewExpand: 'fa-caret-down',
  dropdown: 'fa-caret-down',
  radioOn: 'fa-dot-circle-o',
  radioOff: 'fa-circle-o',
  edit: 'fa-pencil',
  ratingEmpty: 'fa-star-o',
  ratingFull: 'fa-star',
  ratingHalf: 'fa-star-half-o',
  loading: 'fa-refresh',
  first: 'fa-step-backward',
  last: 'fa-step-forward',
  unfold: 'fa-angle-double-down',
  file: 'fa-paperclip',
  plus: 'fa-plus',
  minus: 'fa-minus',
}

const fa: IconSet = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: props => h(VClassIcon, { ...props, class: 'fa' }),
}

export { aliases, fa }
