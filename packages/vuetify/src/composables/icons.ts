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

interface IconProps {
  tag: string
  type: string
  icon: VuetifyIcon
  disabled?: Boolean
  class?: unknown[]
  style?: Record<string, unknown> | null
}

export interface IconPreset {
  component: (props: IconProps) => Component
  values?: Partial<VuetifyIcons>
}

export type IconOptions = Record<string, IconPreset>

export const VuetifyIconSymbol: InjectionKey<IconOptions> = Symbol.for('vuetify:icons')

export const useIcon = (props: { icon: VuetifyIcon, type: string }) => {
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

    let icon: VuetifyIcon = props.icon

    if (typeof props.icon === 'string' && props.icon.startsWith('$') && preset.values) {
      icon = preset.values[props.icon.slice(1)] ?? icon
    }

    return {
      component: preset.component,
      icon,
    }
  })

  return { icon }
}
