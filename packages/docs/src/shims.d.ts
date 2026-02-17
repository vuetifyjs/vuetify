declare module '*.md' {
  import type { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'virtual:mdi-js-icons' {
  export interface IconEntry {
    name: string
    aliases: string[]
    path: string
  }
  export const icons: IconEntry[]
}

declare module 'virtual:api-list' {
  const list: string[]
  export default list
}

declare module 'markdown-it-header-sections' {
  import type { PluginSimple } from 'markdown-it'

  const MarkdownItHeaderSections: PluginSimple
  export default MarkdownItHeaderSections
}

declare module 'markdown-it-attrs' {
  import type { PluginWithOptions } from 'markdown-it'

  const MarkdownItAttrs: PluginWithOptions<{
    leftDelimiter?: string
    rightDelimiter?: string
    allowedAttributes?: string[]
  }>
  export default MarkdownItAttrs
}

declare module 'markdown-it-link-attributes' {
  import type { PluginWithOptions } from 'markdown-it'

  interface Config {
    pattern?: string
    attrs: Record<string, string>
  }

  const MarkdownItLinkAttributes: PluginWithOptions<Config | Config[]>
  export default MarkdownItLinkAttributes
}

declare module 'markdown-it-emoji/bare.js'

declare module 'virtual:examples' {
  import type { Component } from 'vue'

  export function getExample (name: string): Promise<{
    component: Component
    source: string
  }>
}

declare module 'vue-instantsearch/vue3/es/src/instantsearch.js'

declare module 'async-es/eachLimit'
