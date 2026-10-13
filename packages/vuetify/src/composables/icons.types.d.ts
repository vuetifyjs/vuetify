// Types
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type IconValue =
  | string
  | (string | [path: string, opacity: number])[]
  | JSXComponent

export interface VComponentIconProps {
  icon?: IconValue
  tag: string | JSXComponent
}

export type VComponentIconDefaultKeys = never

export declare const VComponentIcon: VuetifyComponent<
  VComponentIconProps,
  VComponentIconDefaultKeys,
  Record<string, any>
>
export type VComponentIcon = InstanceType<typeof VComponentIcon>

export interface VSvgIconProps {
  icon?: IconValue
  tag: string | JSXComponent
}

export type VSvgIconDefaultKeys = never

export declare const VSvgIcon: VuetifyComponent<
  VSvgIconProps,
  VSvgIconDefaultKeys,
  {},
  null
>
export type VSvgIcon = InstanceType<typeof VSvgIcon>

export interface VLigatureIconProps {
  icon?: IconValue
  tag: string | JSXComponent
}

export type VLigatureIconDefaultKeys = never

export declare const VLigatureIcon: VuetifyComponent<
  VLigatureIconProps,
  VLigatureIconDefaultKeys,
  {},
  null
>
export type VLigatureIcon = InstanceType<typeof VLigatureIcon>

export interface VClassIconProps {
  icon?: IconValue
  tag: string | JSXComponent
}

export type VClassIconDefaultKeys = never

export declare const VClassIcon: VuetifyComponent<
  VClassIconProps,
  VClassIconDefaultKeys,
  {},
  null
>
export type VClassIcon = InstanceType<typeof VClassIcon>
