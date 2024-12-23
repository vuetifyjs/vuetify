// Composables
import { VLigatureIcon } from '@/composables/icons'

// Utilities
import { h } from 'vue'

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
  delimiter: ['M12 19q-2.925 0-4.962-2.037T5 12t2.038-4.962T12 5t4.963 2.038T19 12t-2.037 4.963T12 19'], // for carousel
  sortAsc: 'arrow_upward',
  sortDesc: 'arrow_downward',
  expand: 'keyboard_arrow_down',
  menu: 'menu',
  subgroup: 'arrow_drop_down',
  dropdown: 'arrow_drop_down',
  radioOn: 'radio_button_checked',
  radioOff: 'radio_button_unchecked',
  edit: 'edit',
  ratingEmpty: 'star_border',
  ratingFull: ['m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z'],
  ratingHalf: 'star_half',
  loading: 'cached',
  first: 'first_page',
  last: 'last_page',
  unfold: 'unfold_more',
  file: 'attach_file',
  plus: 'add',
  minus: 'remove',
  calendar: 'event',
  treeviewCollapse: 'arrow_drop_down',
  treeviewExpand: 'arrow_right',
  eyeDropper: 'colorize',
}

function mat (type: 'outlined' | 'rounded' | 'sharp'): IconSet {
  return {
    component: props => h(VLigatureIcon, { ...props, class: `material-symbols-${type}` }),
  }
}

export { aliases, mat }
