declare module 'vuetify/es5/components/Vuetify' {
  import Vuetify from 'vuetify'

  export default Vuetify
}

declare module 'vuetify/es5/components/*' {
  import { ComponentOrPack } from 'vuetify'
  import { VueConstructor } from 'vue'

  const VuetifyComponent: {
    // FIX: The & VueConstructor is a lie.
    // This might not be a valid component.
    // But registering arbitrary objects as components is the status quo.
    default: ComponentOrPack & VueConstructor
    [key: string]: ComponentOrPack & VueConstructor
  }

  export = VuetifyComponent
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
