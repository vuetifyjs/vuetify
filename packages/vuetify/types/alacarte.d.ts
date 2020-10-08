declare module 'vuetify/es5/install' {
  import { VueConstructor } from 'vue'

  const install: (Vue: VueConstructor, args: {}) => void

  export { install }
}
declare module 'vuetify/es5/components/Vuetify' {
  import Vuetify from 'vuetify'

  export default Vuetify
}

declare module 'vuetify/es5/components/*' {
  import { ComponentOrPack } from 'vuetify'
  import { VueConstructor } from 'vue'

  const VuetifyComponent: {
    default: ComponentOrPack & VueConstructor
    [key: string]: ComponentOrPack & VueConstructor
  }

  export = VuetifyComponent
}

declare module 'vuetify/es5/directives' {
  import { DirectiveOptions } from 'vue'

  const ClickOutside: DirectiveOptions
  const Intersect: DirectiveOptions
  const Mutate: DirectiveOptions
  const Resize: DirectiveOptions
  const Ripple: DirectiveOptions
  const Scroll: DirectiveOptions
  const Touch: DirectiveOptions

  export {
    ClickOutside,
    Intersect,
    Mutate,
    Ripple,
    Resize,
    Scroll,
    Touch
  }
}
