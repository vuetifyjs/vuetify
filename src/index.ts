import './stylus/app.styl'
import * as components from './components'
import * as directives from './directives'
import { PluginObject, VueConstructor } from 'vue'

declare module Vuetify {
  let version: string
}

function Vuetify (Vue: VueConstructor, args: any): void {
  const VuetifyComponent: PluginObject<any> = components.Vuetify

  Vue.use(VuetifyComponent, {
    components,
    directives,
    ...args
  })
}

Vuetify.version = process.env.VUETIFY_VERSION

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuetify)
}

export default Vuetify
