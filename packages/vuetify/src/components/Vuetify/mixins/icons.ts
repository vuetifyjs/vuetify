import { VuetifyIcon, VuetifyIcons } from 'vuetify'
import { Component } from 'vue'

// Maps internal Vuetify icon names to actual Material Design icon names.
const ICONS_MATERIAL: VuetifyIcons = {
  'complete': 'check',
  'cancel': 'cancel',
  'close': 'close',
  'delete': 'cancel', // delete (e.g. v-chip close)
  'clear': 'clear',
  'success': 'check_circle',
  'info': 'info',
  'warning': 'priority_high',
  'error': 'warning',
  'prev': 'chevron_left',
  'next': 'chevron_right',
  'checkboxOn': 'check_box',
  'checkboxOff': 'check_box_outline_blank',
  'checkboxIndeterminate': 'indeterminate_check_box',
  'delimiter': 'fiber_manual_record', // for carousel
  'sort': 'arrow_upward',
  'expand': 'keyboard_arrow_down',
  'menu': 'menu',
  'subgroup': 'arrow_drop_down',
  'dropdown': 'arrow_drop_down',
  'radioOn': 'radio_button_checked',
  'radioOff': 'radio_button_unchecked',
  'edit': 'edit',
  'ratingEmpty': 'star_border',
  'ratingFull': 'star',
  'ratingHalf': 'star_half',
  'loading': 'cached'
}

// Maps internal Vuetify icon names to actual icons from materialdesignicons.com
const ICONS_MDI: VuetifyIcons = {
  'complete': 'mdi-check',
  'cancel': 'mdi-close-circle',
  'close': 'mdi-close',
  'delete': 'mdi-close-circle', // delete (e.g. v-chip close)
  'clear': 'mdi-close',
  'success': 'mdi-check-circle',
  'info': 'mdi-information',
  'warning': 'mdi-exclamation',
  'error': 'mdi-alert',
  'prev': 'mdi-chevron-left',
  'next': 'mdi-chevron-right',
  'checkboxOn': 'mdi-checkbox-marked',
  'checkboxOff': 'mdi-checkbox-blank-outline',
  'checkboxIndeterminate': 'mdi-minus-box',
  'delimiter': 'mdi-circle', // for carousel
  'sort': 'mdi-arrow-up',
  'expand': 'mdi-chevron-down',
  'menu': 'mdi-menu',
  'subgroup': 'mdi-menu-down',
  'dropdown': 'mdi-menu-down',
  'radioOn': 'mdi-radiobox-marked',
  'radioOff': 'mdi-radiobox-blank',
  'edit': 'mdi-pencil',
  'ratingEmpty': 'mdi-star-outline',
  'ratingFull': 'mdi-star',
  'ratingHalf': 'mdi-star-half'
}

// Maps internal Vuetify icon names to actual Font-Awesome 4 icon names.
const ICONS_FONTAWESOME4: VuetifyIcons = {
  'complete': 'fa fa-check',
  'cancel': 'fa fa-times-circle',
  'close': 'fa fa-times',
  'delete': 'fa fa-times-circle', // delete (e.g. v-chip close)
  'clear': 'fa fa-times-circle', // delete (e.g. v-chip close)
  'success': 'fa fa-check-circle',
  'info': 'fa fa-info-circle',
  'warning': 'fa fa-exclamation',
  'error': 'fa fa-exclamation-triangle',
  'prev': 'fa fa-chevron-left',
  'next': 'fa fa-chevron-right',
  'checkboxOn': 'fa fa-check-square',
  'checkboxOff': 'fa fa-square-o', // note 'far'
  'checkboxIndeterminate': 'fa fa-minus-square',
  'delimiter': 'fa fa-circle', // for carousel
  'sort': 'fa fa-sort-up',
  'expand': 'fa fa-chevron-down',
  'menu': 'fa fa-bars',
  'subgroup': 'fa fa-caret-down',
  'dropdown': 'fa fa-caret-down',
  'radioOn': 'fa fa-dot-circle',
  'radioOff': 'fa fa-circle-o',
  'edit': 'fa fa-pencil',
  'ratingEmpty': 'fa fa-star-o',
  'ratingFull': 'fa fa-star',
  'ratingHalf': 'fa fa-star-half-o'
}

// Maps internal Vuetify icon names to actual Font-Awesome 5+ icon names.
const ICONS_FONTAWESOME: VuetifyIcons = {
  'complete': 'fas fa-check',
  'cancel': 'fas fa-times-circle',
  'close': 'fas fa-times',
  'delete': 'fas fa-times-circle', // delete (e.g. v-chip close)
  'clear': 'fas fa-times-circle', // delete (e.g. v-chip close)
  'success': 'fas fa-check-circle',
  'info': 'fas fa-info-circle',
  'warning': 'fas fa-exclamation',
  'error': 'fas fa-exclamation-triangle',
  'prev': 'fas fa-chevron-left',
  'next': 'fas fa-chevron-right',
  'checkboxOn': 'fas fa-check-square',
  'checkboxOff': 'far fa-square', // note 'far'
  'checkboxIndeterminate': 'fas fa-minus-square',
  'delimiter': 'fas fa-circle', // for carousel
  'sort': 'fas fa-sort-up',
  'expand': 'fas fa-chevron-down',
  'menu': 'fas fa-bars',
  'subgroup': 'fas fa-caret-down',
  'dropdown': 'fas fa-caret-down',
  'radioOn': 'far fa-dot-circle',
  'radioOff': 'far fa-circle',
  'edit': 'fas fa-edit',
  'ratingEmpty': 'far fa-star',
  'ratingFull': 'fas fa-star',
  'ratingHalf': 'fas fa-star-half'
}

export function convertToComponentDeclarations (
  component: Component | string,
  iconSet: VuetifyIcons
) {
  const result: {[name: string]: VuetifyIcon} = {}

  for (const key in iconSet) {
    result[key] = {
      component,
      props: {
        icon: (iconSet[key] as string).split(' fa-')
      }
    }
  }

  return result as VuetifyIcons
}

const iconSets: Record<string, VuetifyIcons> = {
  md: ICONS_MATERIAL,
  mdi: ICONS_MDI,
  fa: ICONS_FONTAWESOME,
  fa4: ICONS_FONTAWESOME4,
  faSvg: convertToComponentDeclarations('font-awesome-icon', ICONS_FONTAWESOME)
}

export default function icons (iconfont = 'md', icons: Partial<VuetifyIcons> = {}) {
  return Object.assign({}, iconSets[iconfont] || iconSets.md, icons)
}
