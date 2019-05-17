import { PluginFunction, Component } from 'vue'

export default interface LegacyGrid {
  install: PluginFunction<never>
  version: number
}

export const VContainer: Component
export const VFlex: Component
export const VLayout: Component
export const VSpacer: Component
