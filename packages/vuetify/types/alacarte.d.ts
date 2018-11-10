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
  import { DirectiveOptions, PluginFunction } from 'vue'

  const ClickOutside: DirectiveOptions
  const Ripple: DirectiveOptions
  const Resize: DirectiveOptions
  const Scroll: DirectiveOptions
  const Touch: DirectiveOptions

  export {
    ClickOutside,
    Ripple,
    Resize,
    Scroll,
    Touch
  }
}
