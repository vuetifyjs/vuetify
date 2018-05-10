declare module 'vuetify/es5/components/Vuetify' {
  import Vuetify from 'vuetify'

  export default Vuetify
}

declare module 'vuetify/es5/components/*' {
  import { PluginFunction } from 'vue'

  module Component {
    const install: PluginFunction<never>
  }

  export default Component
}
