import { VueConstructor } from 'vue'

declare global {
  interface Window {
    Vue: VueConstructor
  }
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    version: string
  }
}
