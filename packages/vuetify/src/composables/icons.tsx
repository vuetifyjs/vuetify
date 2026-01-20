// Utilities
import { computed, inject, toValue } from 'vue'
import { consoleWarn, defineComponent, genericComponent, propsFactory } from '@/util'

// Types
import type { InjectionKey, MaybeRefOrGetter, PropType } from 'vue'
import type { JSXComponent } from '@/util'

export type IconValue =
  | string
  | (string | [path: string, opacity: number])[]
  | JSXComponent
export const IconValue = [String, Function, Object, Array] as PropType<IconValue>

export interface IconAliases {
  [name: string]: IconValue
  collapse: IconValue
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
  sortAsc: IconValue
  sortDesc: IconValue
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
  calendar: IconValue
  treeviewCollapse: IconValue
  treeviewExpand: IconValue
  eyeDropper: IconValue
  upload: IconValue
  color: IconValue
  // Font Awesome does not have most of these icons!
  command: IconValue
  ctrl: IconValue
  space: IconValue
  shift: IconValue
  alt: IconValue
  enter: IconValue
  arrowup: IconValue
  arrowdown: IconValue
  arrowleft: IconValue
  arrowright: IconValue
  backspace: IconValue
}

export interface IconProps {
  tag: string | JSXComponent
  icon?: IconValue
  disabled?: boolean
}

type IconComponent = JSXComponent<IconProps>

export interface IconSet {
  component: IconComponent
}

export type InternalIconOptions = {
  defaultSet: string
  aliases: Partial<IconAliases>
  sets: Record<string, IconSet>
}

export type IconOptions = Partial<InternalIconOptions>

type IconInstance = {
  component: IconComponent
  icon?: IconValue
}

export const IconSymbol: InjectionKey<InternalIconOptions> = Symbol.for('vuetify:icons')

export const makeIconProps = propsFactory({
  icon: {
    type: IconValue,
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: [String, Object, Function] as PropType<string | JSXComponent>,
    required: true,
  },
}, 'icon')

export const VComponentIcon = genericComponent()({
  name: 'VComponentIcon',

  props: makeIconProps(),

  setup (props, { slots }) {
    return () => {
      const Icon = props.icon as JSXComponent
      return (
        <props.tag>
          { props.icon ? <Icon /> : slots.default?.() }
        </props.tag>
      )
    }
  },
})
export type VComponentIcon = InstanceType<typeof VComponentIcon>

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
            { Array.isArray(props.icon)
              ? props.icon.map(path => (
                Array.isArray(path)
                  ? <path d={ path[0] as string } fill-opacity={ path[1] }></path>
                  : <path d={ path as string }></path>
              ))
              : <path d={ props.icon as string }></path>
            }
          </svg>
        </props.tag>
      )
    }
  },
})
export type VSvgIcon = InstanceType<typeof VSvgIcon>

export const VLigatureIcon = defineComponent({
  name: 'VLigatureIcon',

  props: makeIconProps(),

  setup (props) {
    return () => {
      return <props.tag>{ props.icon }</props.tag>
    }
  },
})
export type VLigatureIcon = InstanceType<typeof VLigatureIcon>

export const VClassIcon = defineComponent({
  name: 'VClassIcon',

  props: makeIconProps(),

  setup (props) {
    return () => {
      return <props.tag class={ props.icon }></props.tag>
    }
  },
})
export type VClassIcon = InstanceType<typeof VClassIcon>

export const useIcon = (props: MaybeRefOrGetter<IconValue | undefined>) => {
  const icons = inject(IconSymbol)

  if (!icons) throw new Error('Missing Vuetify Icons provide!')

  const iconData = computed<IconInstance>(() => {
    const iconAlias = toValue(props)

    if (!iconAlias) return { component: VComponentIcon }

    let icon: IconValue | undefined = iconAlias

    if (typeof icon === 'string') {
      icon = icon.trim()
      if (icon.startsWith('$')) {
        icon = icons.aliases?.[icon.slice(1)]
      }
    }

    if (!icon) consoleWarn(`Could not find aliased icon "${iconAlias}"`)

    if (Array.isArray(icon)) {
      return {
        component: VSvgIcon,
        icon,
      }
    } else if (typeof icon !== 'string') {
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
