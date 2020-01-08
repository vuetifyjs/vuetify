// Core
import { App } from 'vue'
import { VuetifyUseOptions } from 'types'
import { install as VuetifyInstall } from './install'

// Functionality
import * as components from './components'
import * as directives from './directives'

// Wrapped install function to register all components by default
// original install for a-la-carte is re-exported in entry-lib.ts
export default function install (app: App, args: VuetifyUseOptions) {
  VuetifyInstall(app, {
    components,
    directives,
    ...args,
  })
}

export { useVuetify, version } from './framework'
