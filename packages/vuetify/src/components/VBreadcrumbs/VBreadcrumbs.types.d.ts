// Types
import type { StyleValue } from 'vue'
import type { Density } from '@/composables/density.types'
import type { IconValue } from '@/composables/icons.types'
import type { LinkProps } from '@/composables/router.types'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type BreadcrumbItem = string | InternalBreadcrumbItem

export type InternalBreadcrumbItem = Partial<LinkProps> & {
  title: string
  disabled?: boolean
}

export interface VBreadcrumbsProps {
  activeClass?: string
  activeColor?: string
  bgColor?: string
  class?: any
  color?: string
  density?: Density
  disabled?: boolean
  divider?: string
  icon?: IconValue
  items?: readonly BreadcrumbItem[]
  rounded?: string | number | boolean
  style?: StyleValue
  tag?: string | JSXComponent
  tile?: boolean
}

type VBreadcrumbsDefaultKeys =
  | 'density'
  | 'disabled'
  | 'divider'
  | 'items'
  | 'rounded'
  | 'style'
  | 'tag'
  | 'tile'

export declare const VBreadcrumbs: VuetifyComponent<
  VBreadcrumbsProps,
  VBreadcrumbsDefaultKeys,
  Record<string, any>,
  new <T extends BreadcrumbItem>(
    props: {
      items?: T[]
    },
    slots: {
      prepend: never
      title: { item: InternalBreadcrumbItem, index: number }
      divider: { item: T, index: number }
      item: { item: InternalBreadcrumbItem, index: number }
      default: never
    }
  ) => GenericProps<typeof props, typeof slots>
>
export type VBreadcrumbs = InstanceType<typeof VBreadcrumbs>

export {}
