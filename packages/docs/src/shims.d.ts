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

declare module 'cosmicjs' {
  interface Cosmic<T> {
    bucket (params: {
      slug: string
      read_key: string
      write_key?: string
    }): Bucket<T>
  }
  interface BucketObjects<T> {
    [key: string]: (params: Record<string, any> | string | number) => BucketObjects<T>
    objects?: T[]
  }
  interface Bucket<T> {
    objects: BucketObjects<T>
  }
  export default function Cosmic<T> (): Cosmic<T>
}

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
