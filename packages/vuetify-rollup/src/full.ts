// Core
import { App } from 'vue'

// Styles
import './styles/main.sass'

// Functionality
import * as components from './components'

import { VuetifyInstall } from './install'

// Wrapped install function to register all components by default
// original install for a-la-carte is re-exported in entry-lib.ts
export default function install (app: App, options = {}) {
  VuetifyInstall(app, {
    components,
    ...options,
  })
}

install.version = VuetifyInstall.version
