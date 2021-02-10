// Components
import { VClassIcon, VComponentIcon, VSvgIcon } from '@/components'

// Utilities
import { computed, inject } from 'vue'

// Types
import type { Component, InjectionKey, Ref } from 'vue'

export type IconValue = string | Component

export interface IconAliases {
  [name: string]: IconValue
  complete: IconValue
  cancel: IconValue
  close: IconValue
  delete: IconValue
  clear: IconValue
  success: IconValue
  info: IconValue
  warning: IconValue
  error: IconValue
  prev: IconValue
  next: IconValue
  checkboxOn: IconValue
  checkboxOff: IconValue
  checkboxIndeterminate: IconValue
  delimiter: IconValue
  sort: IconValue
  expand: IconValue
  menu: IconValue
  subgroup: IconValue
  dropdown: IconValue
  radioOn: IconValue
  radioOff: IconValue
  edit: IconValue
  ratingEmpty: IconValue
  ratingFull: IconValue
  ratingHalf: IconValue
  loading: IconValue
  first: IconValue
  last: IconValue
  unfold: IconValue
  file: IconValue
  plus: IconValue
  minus: IconValue
}

export interface IconProps {
  tag: string
  icon: IconValue
  disabled?: Boolean
}

type IconComponent = Component<IconProps>

export interface IconSet {
  component: IconComponent
}

export type IconOptions = {
  defaultSet: string
  aliases?: Partial<IconAliases>
  sets: Record<string, IconSet>
}

type IconInstance = {
  component: IconComponent
  icon: IconValue
}

export const VuetifyIconSymbol: InjectionKey<IconOptions> = Symbol.for('vuetify:icons')

export const defaultSets: Record<string, IconSet> = {
  svg: {
    component: VSvgIcon,
  },
  class: {
    component: VClassIcon,
  },
}

// Composables
export const useIcon = (props: { icon: IconValue }) => {
  const icons = inject(VuetifyIconSymbol)

  if (!icons) throw new Error('Missing Vuetify Icons provide!')

  const iconData: Ref<IconInstance> = computed(() => {
    if (!props.icon) throw new Error('Icon value is undefined or null')

    let icon: IconValue | undefined = props.icon

    if (typeof props.icon === 'string' && props.icon.includes('$')) {
      icon = icons.aliases?.[props.icon.slice(props.icon.indexOf('$') + 1)]
    }

    if (!icon) throw new Error(`Could not find aliased icon "${props.icon}"`)

    if (typeof icon !== 'string') {
      return {
        component: VComponentIcon,
        icon,
      }
    }

    const hasSet = icon.includes(':')
    const setName = hasSet ? icon.split(':')[0] : icons.defaultSet
    const iconName = hasSet ? icon.split(':')[1] : icon
    const set = icons.sets[setName ?? icons.defaultSet]

    if (!set) {
      throw new Error(`Could not find icon set "${setName}"`)
    }

    return {
      component: set.component,
      icon: iconName,
    }
  })

  return { iconData }
}
