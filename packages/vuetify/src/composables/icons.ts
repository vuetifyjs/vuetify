// Utilities
import { computed, h, inject } from 'vue'

// Types
import type { Component, InjectionKey } from 'vue'

export type VuetifyIcon = string

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

interface IconProps {
  tag: string
  type: string
  icon: string
  disabled?: Boolean
  class?: unknown[]
  style?: Record<string, unknown> | null
}

export interface IconPreset {
  component: (props: IconProps) => Component
  values: VuetifyIcons
}

export type IconOptions = Record<string, IconPreset>

export const VuetifyIconSymbol: InjectionKey<IconOptions> = Symbol.for('vuetify:icons')

export const useIcon = (props: { icon: string, type: string }) => {
  const icons = inject(VuetifyIconSymbol)

  if (!icons) throw new Error('Missing Vuetify Icons provide!')

  const icon = computed(() => {
    const preset = icons[props.type]

    if (!preset) {
      // TODO: Throw error?
      return {
        component: () => h('div', ['error!']),
        icon: props.icon,
      }
    }

    return {
      component: preset.component,
      icon: props.icon.startsWith('$') ? preset.values[props.icon.slice(1)] : props.icon,
    }
  })

  return { icon }
}
