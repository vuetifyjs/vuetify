// Services
import * as services from './services'

// Preset
import DefaultPreset from './presets/default'

// Styles
import './stylus/app.styl'

// Utilties
import { install } from './install'

// Types
import {
  VuetifyService,
  VuetifyServiceContract
} from 'vuetify/types/services'
import { VuetifyPreset } from 'vuetify/types/presets'
import { VueConstructor } from 'vue'

export default class Vuetify {
  static install: (Vue: VueConstructor) => void
  static version: string

  framework: Record<string, VuetifyServiceContract> = {}
  globals = ['rtl']
  installed: string[] = []
  defaultPreset: VuetifyPreset
  preset: Partial<VuetifyPreset> = {}

  constructor (
    preset: Partial<VuetifyPreset> = {},
    defaultPreset: VuetifyPreset = DefaultPreset
  ) {
    this.preset = preset
    this.defaultPreset = defaultPreset

    this.use(services.Application)
    this.use(services.Breakpoint)
    this.use(services.Goto)
    this.use(services.Icons)
    this.use(services.Lang)
    this.use(services.Theme)
  }

  // Called on the new vuetify instance
  // bootstrap in install beforeCreate
  // Exposes ssrContext if available
  init (ssrContext?: object) {
    this.globals.forEach(property => {
      const value = this.preset[property] || this.defaultPreset[property]

      this.framework[property] = value
    })

    this.installed.forEach(property => {
      const service = this.framework[property]

      service.framework = this.framework

      service.init(ssrContext)
    })
  }

  // Instantiate a VuetifyService
  use (Service: VuetifyService) {
    const property = Service.property

    if (this.installed.includes(property)) return

    this.framework[property] = new Service(
      this.preset[property],
      this.defaultPreset[property]
    )

    this.installed.push(property)
  }
}

Vuetify.install = install
Vuetify.version = __VUETIFY_VERSION__
