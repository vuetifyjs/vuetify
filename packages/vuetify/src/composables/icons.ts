// Utilities
import { computed, h, inject } from 'vue'

// Types
import type { Component, InjectionKey } from 'vue'

export type VuetifyIcon = string | Component

export interface VuetifyIcons {
  [name: string]: VuetifyIcon
  complete: VuetifyIcon
  cancel: VuetifyIcon
  close: VuetifyIcon
  delete: VuetifyIcon
  clear: VuetifyIcon
  success: VuetifyIcon
  info: VuetifyIcon
  warning: VuetifyIcon
  error: VuetifyIcon
  prev: VuetifyIcon
  next: VuetifyIcon
  checkboxOn: VuetifyIcon
  checkboxOff: VuetifyIcon
  checkboxIndeterminate: VuetifyIcon
  delimiter: VuetifyIcon
  sort: VuetifyIcon
  expand: VuetifyIcon
  menu: VuetifyIcon
  subgroup: VuetifyIcon
  dropdown: VuetifyIcon
  radioOn: VuetifyIcon
  radioOff: VuetifyIcon
  edit: VuetifyIcon
  ratingEmpty: VuetifyIcon
  ratingFull: VuetifyIcon
  ratingHalf: VuetifyIcon
  loading: VuetifyIcon
  first: VuetifyIcon
  last: VuetifyIcon
  unfold: VuetifyIcon
  file: VuetifyIcon
  plus: VuetifyIcon
  minus: VuetifyIcon
}

export interface IconProps {
  tag: string
  set: string
  icon: VuetifyIcon
  disabled?: Boolean
  class?: unknown[]
  style?: Record<string, unknown> | null
  'aria-hidden': boolean
  type?: string
}

export interface IconPreset {
  component: (props: IconProps) => Component
  values?: Partial<VuetifyIcons>
}

export type IconOptions = Record<string, IconPreset>

export const VuetifyIconSymbol: InjectionKey<IconOptions> = Symbol.for('vuetify:icons')

export const useIcon = (props: { icon: VuetifyIcon, set: string }) => {
  const icons = inject(VuetifyIconSymbol)

  if (!icons) throw new Error('Missing Vuetify Icons provide!')

  const icon = computed(() => {
    const set = icons[props.set]

    if (!set) {
      // TODO: Throw error?
      return {
        component: () => h('div', ['error!']),
        icon: props.icon,
      }
    }

    let icon: VuetifyIcon = props.icon

    if (typeof props.icon === 'string' && props.icon.startsWith('$') && set.values) {
      icon = set.values[props.icon.slice(1)] ?? icon
    }

    return {
      component: set.component,
      icon,
    }
  })

  return { icon }
}
