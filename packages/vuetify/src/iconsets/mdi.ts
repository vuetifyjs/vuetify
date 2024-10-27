// Composables
import { VClassIcon } from '@/composables/icons'

// Utilities
import { h } from 'vue'

// Types
import type { IconAliases, IconSet } from '@/composables/icons'

const aliases: IconAliases = {
  calendar: 'mdi-calendar',
  cancel: 'mdi-close-circle',
  checkboxIndeterminate: 'mdi-minus-box',
  checkboxOff: 'mdi-checkbox-blank-outline',
  checkboxOn: 'mdi-checkbox-marked',
  clear: 'mdi-close-circle',
  close: 'mdi-close',
  collapse: 'mdi-chevron-up',
  complete: 'mdi-check',
  delete: 'mdi-close-circle', // delete (e.g. v-chip close)
  delimiter: 'mdi-circle', // for carousel
  dropdown: 'mdi-menu-down',
  edit: 'mdi-pencil',
  error: 'mdi-close-circle',
  expand: 'mdi-chevron-down',
  eyeDropper: 'mdi-eyedropper',
  file: 'mdi-paperclip',
  first: 'mdi-page-first',
  info: 'mdi-information',
  last: 'mdi-page-last',
  loading: 'mdi-cached',
  menu: 'mdi-menu',
  minus: 'mdi-minus',
  next: 'mdi-chevron-right',
  pip: 'mdi-circle',
  plus: 'mdi-plus',
  prev: 'mdi-chevron-left',
  radioOff: 'mdi-radiobox-blank',
  radioOn: 'mdi-radiobox-marked',
  ratingEmpty: 'mdi-star-outline',
  ratingFull: 'mdi-star',
  ratingHalf: 'mdi-star-half-full',
  sortAsc: 'mdi-arrow-up',
  sortDesc: 'mdi-arrow-down',
  subgroup: 'mdi-menu-down',
  success: 'mdi-check-circle',
  treeviewCollapse: 'mdi-menu-down',
  treeviewExpand: 'mdi-menu-right',
  unfold: 'mdi-unfold-more-horizontal',
  warning: 'mdi-alert-circle',
}

const mdi: IconSet = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: (props: any) => h(VClassIcon, { ...props, class: 'mdi' }),
}

export { aliases, mdi }
