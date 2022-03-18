// Icons
import { aliases, mdi } from '@/iconsets/mdi'

// Utilities
import { computed, inject, isRef } from 'vue'
import { defineComponent, mergeDeep, propsFactory } from '@/util'

// Types
import type { InjectionKey, JSXComponent, PropType, Ref } from 'vue'

export type IconValue = string | JSXComponent
export const IconValue = [String, Function, Object] as PropType<IconValue>

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
  treeviewExpand: IconValue
  treeviewCollapse: IconValue
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

export const IconSymbol: InjectionKey<IconOptions> = Symbol.for('vuetify:icons')

export const makeIconProps = propsFactory({
  icon: {
    type: IconValue,
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

  props: makeIconProps(),

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

  props: makeIconProps(),

  setup (props, { attrs }) {
    return () => {
      return (
        <props.tag { ...attrs } style={ null }>
          <svg
            class="v-icon__svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            role="img"
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

  props: makeIconProps(),

  setup (props) {
    return () => {
      return <props.tag>{ props.icon }</props.tag>
    }
  },
})

export const VClassIcon = defineComponent({
  name: 'VClassIcon',

  props: makeIconProps(),

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
export function createIcons (options?: IconOptions) {
  return mergeDeep({
    defaultSet: 'mdi',
    sets: {
      ...defaultSets,
      mdi,
    },
    aliases,
  }, options)
}

export const useIcon = (props: Ref<string | undefined> | { icon?: IconValue }) => {
  const icons = inject(IconSymbol)

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

    const iconSetName = Object.keys(icons.sets).find(
      setName => typeof icon === 'string' && icon.startsWith(`${setName}:`)
    )

    const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon
    const iconSet = icons.sets[iconSetName ?? icons.defaultSet]

    return {
      component: iconSet.component,
      icon: iconName,
    }
  })

  return { iconData }
}
