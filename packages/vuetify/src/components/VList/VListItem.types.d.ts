// Types
import type { ComputedRef, MaybeRefOrGetter, Ref, StyleValue } from 'vue'
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'
import type { Density } from '@/composables/density.types'
import type { IconValue } from '@/composables/icons.types'
import type { ItemsRegistrationType } from '@/composables/nested/nested.types'
import type { UseLink } from '@/composables/router'
import type { Variant } from '@/composables/variant.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type ListItemSlot = {
  index?: number
  depth?: number
  path?: number[]
  isFirst?: boolean
  isLast?: boolean
  isActive: boolean
  isOpen: boolean
  isSelected: boolean
  isIndeterminate: boolean
  isDisabled: boolean
  select: (value: boolean) => void
}

export type ListItemTitleSlot = {
  title?: string | number | boolean
}

export type ListItemSubtitleSlot = {
  subtitle?: string | number | boolean
}

export type VListItemSlots = {
  prepend: ListItemSlot
  append: ListItemSlot
  default: ListItemSlot
  title: ListItemTitleSlot
  subtitle: ListItemSubtitleSlot
}

export interface VListItemProps {
  active?: boolean
  activeClass?: string
  activeColor?: string
  appendAvatar?: string
  appendIcon?: IconValue
  baseColor?: string
  border?: string | number | boolean
  class?: any
  color?: string
  density?: Density
  disabled?: boolean
  elevation?: string | number
  exact?: boolean
  height?: string | number
  hoverElevation?: string | number
  href?: string
  index?: number
  lines?: false | 'one' | 'two' | 'three'
  link?: boolean
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  nav?: boolean
  onClick?: ((args_0: MouseEvent | KeyboardEvent) => void)
  onClickOnce?: ((args_0: MouseEvent) => void)
  prependAvatar?: string
  prependGap?: string | number
  prependIcon?: IconValue
  replace?: boolean
  ripple?: boolean | { class?: string | undefined, keys?: string[] | undefined }
  rounded?: string | number | boolean
  slim?: boolean
  style?: StyleValue
  subtitle?: string | number | boolean
  tabindex?: string | number
  tag?: string | JSXComponent
  theme?: string
  tile?: boolean
  title?: string | number | boolean
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
  value?: any
  variant?: Variant
  width?: string | number
}

export type VListItemDefaultKeys =
  | 'active'
  | 'density'
  | 'disabled'
  | 'exact'
  | 'link'
  | 'nav'
  | 'replace'
  | 'ripple'
  | 'rounded'
  | 'slim'
  | 'style'
  | 'subtitle'
  | 'tag'
  | 'tile'
  | 'title'
  | 'variant'

export declare const VListItem: VuetifyComponent<
  VListItemProps,
  VListItemDefaultKeys,
  {
    click: (e: MouseEvent | KeyboardEvent) => true
  },
  VListItemSlots,
  { activate: (activated: boolean, e?: Event | undefined) => void, isActivated: ComputedRef<boolean>, isGroupActivator: boolean | undefined, isSelected: ComputedRef<boolean>, list: { filterable: MaybeRefOrGetter<boolean>, hasPrepend: Ref<boolean, boolean>, updateHasPrepend: (value: boolean) => void, trackingIndex: Ref<number, number>, navigationStrategy: Ref<'focus' | 'track', 'focus' | 'track'>, uid: string } | null, select: (selected: boolean, e?: Event | undefined) => void, root: { children: Ref<Map<unknown, unknown[]>, Map<unknown, unknown[]>>, parents: Ref<Map<unknown, unknown>, Map<unknown, unknown>>, disabled: Ref<Set<unknown>, Set<unknown>>, activatable: Ref<boolean, boolean>, selectable: Ref<boolean, boolean>, opened: Ref<Set<unknown>, Set<unknown>>, activated: Ref<Set<unknown>, Set<unknown>>, scrollToActive: Ref<boolean, boolean>, selected: Ref<Map<unknown, 'off' | 'indeterminate' | 'on'>, Map<unknown, 'off' | 'indeterminate' | 'on'>>, selectedValues: Ref<unknown[], unknown[]>, itemsRegistration: Ref<ItemsRegistrationType, ItemsRegistrationType>, register: (id: unknown, parentId: unknown, isDisabled: boolean, isGroup?: boolean | undefined) => void, unregister: (id: unknown) => void, updateDisabled: (id: unknown, isDisabled: boolean) => void, open: (id: unknown, value: boolean, event?: Event | undefined) => void, activate: (id: unknown, value: boolean, event?: Event | undefined) => void, select: (id: unknown, value: boolean, event?: Event | undefined) => void, openOnSelect: (id: unknown, value: boolean, event?: Event | undefined) => void, getPath: (id: unknown) => unknown[] }, id: ComputedRef<{} | null>, link: UseLink }
>
export type VListItem = InstanceType<typeof VListItem>
