// Utilities
import { computed, defineComponent, inject, isRef } from 'vue'
import propsFactory from '@/util/propsFactory'
import makeProps from '@/util/makeProps'

// Types
import type { JSXComponent, PropType, InjectionKey, Ref } from 'vue'

export type IconValue = string | JSXComponent

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

type IconComponent = JSXComponent<IconProps>

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

export const makeIconProps = propsFactory({
  icon: {
    type: [String, Object] as PropType<IconValue>,
    required: true,
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: true,
  },
}, 'icon')

export const VComponentIcon = defineComponent({
  name: 'VComponentIcon',

  props: makeProps(makeIconProps()),

  setup (props) {
    return () => {
      return (
        <props.tag>
          <props.icon />
        </props.tag>
      )
    }
  },
})

export const VSvgIcon = defineComponent({
  name: 'VSvgIcon',

  inheritAttrs: false,

  props: makeProps(makeIconProps()),

  setup (props, { attrs }) {
    return () => {
      return (
        <props.tag { ...attrs } style={ null }>
          <svg
            class='v-icon__svg'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            role='img'
            aria-hidden="true"
          >
            <path d={ props.icon as string }></path>
          </svg>
        </props.tag>
      )
    }
  },
})

export const VLigatureIcon = defineComponent({
  name: 'VLigatureIcon',

  props: makeProps(makeIconProps()),

  setup (props) {
    return () => {
      return <props.tag>{ props.icon }</props.tag>
    }
  },
})

export const VClassIcon = defineComponent({
  name: 'VClassIcon',

  props: makeProps(makeIconProps()),

  setup (props) {
    return () => {
      return <props.tag class={ props.icon }></props.tag>
    }
  },
})

export const defaultSets: Record<string, IconSet> = {
  svg: {
    component: VSvgIcon,
  },
  class: {
    component: VClassIcon,
  },
}

// Composables
export const useIcon = (props: Ref<string | undefined> | { icon?: IconValue }) => {
  const icons = inject(VuetifyIconSymbol)

  if (!icons) throw new Error('Missing Vuetify Icons provide!')

  const iconData: Ref<IconInstance> = computed(() => {
    const iconAlias = isRef(props) ? props.value : props.icon

    if (!iconAlias) throw new Error('Icon value is undefined or null')

    let icon: IconValue | undefined = iconAlias

    if (typeof iconAlias === 'string' && iconAlias.includes('$')) {
      icon = icons.aliases?.[iconAlias.slice(iconAlias.indexOf('$') + 1)]
    }

    if (!icon) throw new Error(`Could not find aliased icon "${iconAlias}"`)

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
