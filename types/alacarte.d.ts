declare module 'vuetify/es5/components/Vuetify' {
  import Vuetify from 'vuetify'

  export default Vuetify
}

declare module 'vuetify/es5/components/*' {
  import { PluginFunction, PluginObject, VueConstructor, ComponentOptions } from 'vue'

  interface PluginConstructor extends VueConstructor {
    install: PluginFunction<never>
  }

  const Component: {
    default: PluginConstructor,
    [key: string]: PluginConstructor
  }

  export = Component
}
