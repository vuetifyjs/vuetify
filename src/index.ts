import './stylus/app.styl'
import VuetifyComponent from './components/Vuetify'
import * as components from './components'
import directives from './directives'
import { VueConstructor } from 'vue'
import { Vuetify as VuetifyPlugin, VuetifyUseOptions } from 'types'

const Vuetify: VuetifyPlugin = {
  install (Vue: VueConstructor, args?: VuetifyUseOptions): void {
    Vue.use(VuetifyComponent, {
      components,
      directives,
      ...args
    })
  },
  version: __VUETIFY_VERSION__
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuetify)
}

export default Vuetify
