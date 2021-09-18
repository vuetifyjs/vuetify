declare interface Window {
  // extend the window
}

// vite-plugin-md
declare module '*.md' {
  // eslint-disable-next-line import/no-duplicates
  import type { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}

declare module '*.vue' {
  // eslint-disable-next-line import/no-duplicates
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
