import { VueConstructor, ComponentOptions, PluginFunction } from 'vue'
import { Vue } from 'vue/types/vue'

declare global {
  interface Window {
    Vue: VueConstructor
  }
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    version: string,
    install?: PluginFunction<never>
  }
}
