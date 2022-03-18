// Utilities
import { h } from 'vue'

// Components
import { VLigatureIcon } from '@/composables/icons'

// Types
import type { IconAliases, IconSet } from '@/composables/icons'

const aliases: IconAliases = {
  collapse: 'keyboard_arrow_up',
  complete: 'check',
  cancel: 'cancel',
  close: 'close',
  delete: 'cancel', // delete (e.g. v-chip close)
  clear: 'cancel',
  success: 'check_circle',
  info: 'info',
  warning: 'priority_high',
  error: 'warning',
  prev: 'chevron_left',
  next: 'chevron_right',
  checkboxOn: 'check_box',
  checkboxOff: 'check_box_outline_blank',
  checkboxIndeterminate: 'indeterminate_check_box',
  delimiter: 'fiber_manual_record', // for carousel
  sort: 'arrow_upward',
  expand: 'keyboard_arrow_down',
  menu: 'menu',
  treeviewExpand: 'arrow_drop_down',
  treeviewCollapse: 'arrow_drop_down',
  dropdown: 'arrow_drop_down',
  radioOn: 'radio_button_checked',
  radioOff: 'radio_button_unchecked',
  edit: 'edit',
  ratingEmpty: 'star_border',
  ratingFull: 'star',
  ratingHalf: 'star_half',
  loading: 'cached',
  first: 'first_page',
  last: 'last_page',
  unfold: 'unfold_more',
  file: 'attach_file',
  plus: 'add',
  minus: 'remove',
}

const md: IconSet = {
  // Not using mergeProps here, functional components merge props by default (?)
  component: props => h(VLigatureIcon, { ...props, class: 'material-icons' }),
}

export { aliases, md }
