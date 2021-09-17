import type { ViteSSGContext } from 'vite-ssg'

export type i18nPlugin = (ctx: ViteSSGContext) => void
export type pwaPlugin = (ctx: ViteSSGContext) => void
export type piniaPlugin = (ctx: ViteSSGContext) => void
export type vuetifyPlugin = (ctx: ViteSSGContext) => void
