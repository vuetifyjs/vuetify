declare module 'vuetify/es5/components/Vuetify' {
  import Vuetify from 'vuetify'

  export default Vuetify
}

// TODO: transitions
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

declare module 'vuetify/es5/directives' {
  import { PluginFunction } from 'vue'
  import { VuetifyDirective } from 'vuetify'

  const ClickOutside: VuetifyDirective
  const Ripple: VuetifyDirective
  const Resize: VuetifyDirective
  const Scroll: VuetifyDirective
  const Touch: VuetifyDirective

  const Plugin: PluginFunction<never>

  export {
    ClickOutside,
    Ripple,
    Resize,
    Scroll,
    Touch
  }
  export default Plugin
}
