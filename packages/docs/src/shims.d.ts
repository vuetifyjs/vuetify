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
  }
  export const icons: IconEntry[]
}

declare module 'markdown-it-header-sections' {
  import type MarkdownIt from 'markdown-it'

  const MarkdownItHeaderSections: MarkdownIt.PluginSimple
  export default MarkdownItHeaderSections
}

declare module 'markdown-it-attrs' {
  import type MarkdownIt from 'markdown-it'

  const MarkdownItAttrs: MarkdownIt.PluginWithOptions<{
    leftDelimiter?: string
    rightDelimiter?: string
    allowedAttributes?: string[]
  }>
  export default MarkdownItAttrs
}

declare module 'markdown-it-link-attributes' {
  import type MarkdownIt from 'markdown-it'

  interface Config {
    pattern?: string
    attrs: Record<string, string>
  }

  const MarkdownItLinkAttributes: MarkdownIt.PluginWithOptions<Config | Config[]>
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

declare module '@emailjs/browser' {
  interface emailjs {
    sendForm (
      service_id: string,
      template_id: string,
      el: HTMLFormElement,
      public_key: string
    ): Promise<EmailJSResponseStatus>
  }

  const client: emailjs

  export default client
}

declare module 'vue-instantsearch/vue3/es/src/instantsearch.js'
