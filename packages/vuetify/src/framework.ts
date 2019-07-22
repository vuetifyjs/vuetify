import { install } from './install'

// Types
import {
  VuetifyService,
  VuetifyServiceContract,
} from 'vuetify/types/services'
import { VuetifyPreset } from 'vuetify/types/presets'
import Vue from 'vue'

// Services
import * as services from './services'

// Styles
import './styles/main.sass'

export default class Vuetify {
  static install = install

  static installed = false

  static version = __VUETIFY_VERSION__

  framework: Record<string, VuetifyServiceContract> = {}

  installed: string[] = []

  preset: Partial<VuetifyPreset> = {}

  constructor (preset: Partial<VuetifyPreset> = {}) {
    this.preset = preset

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
  init (root: Vue, ssrContext?: object) {
    this.installed.forEach(property => {
      const service = this.framework[property]
      service.framework = this.framework

      service.init(root, ssrContext)
    })

    // rtl is not installed and
    // will never be called by
    // the init process
    this.framework.rtl = Boolean(this.preset.rtl) as any
  }

  // Instantiate a VuetifyService
  use (Service: VuetifyService) {
    const property = Service.property

    if (this.installed.includes(property)) return

    this.framework[property] = new Service(this.preset[property])
    this.installed.push(property)
  }
}
