// import Vuetify, { VuetifySymbol } from './framework'
import { App } from 'vue'
// import { VuetifyUseOptions } from 'types'

export function VuetifyInstall (app: App, options: any = {}) {
  console.log('Installing Vuetify...')

  const {
    components = {},
    directives = {},
    // ...preset
  } = options

  for (const key in directives) {
    const directive = directives[key]

    app.directive(key, directive)
  }

  for (const key in components) {
    const component = components[key]

    app.component(key, component)
  }

  // const vuetify = new Vuetify(preset)

  // app.provide(VuetifySymbol, vuetify.framework)
}

VuetifyInstall.version = __VUETIFY_VERSION__
