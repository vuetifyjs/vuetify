import type { ViteSSGContext } from 'vite-ssg'

export type I18nPlugin = (ctx: ViteSSGContext) => void
export type PwaPlugin = (ctx: ViteSSGContext) => void
export type PiniaPlugin = (ctx: ViteSSGContext) => void
export type VuetifyPlugin = (ctx: ViteSSGContext) => void
export type RouterPlugin = (ctx: ViteSSGContext) => void
export type GlobalComponentsPlugin = (ctx: ViteSSGContext) => void
