import { VBtn } from './VBtn'
import { PluginFunction, VueConstructor } from 'vue'

declare module './VBtn' {
  interface VBtn {
    install: PluginFunction<never>
  }
}

/* istanbul ignore next */
(VBtn as any).install = function install (Vue: VueConstructor) {
  Vue.component(VBtn.name, VBtn)
}

export default VBtn
