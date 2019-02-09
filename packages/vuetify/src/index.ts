import './stylus/app.styl'
import {
  VuetifyService,
  VuetifyServiceInstance
} from 'vuetify/types/services'
import { VueConstructor } from 'vue'
import { install } from './install'
import { VuetifyPreset } from 'vuetify/types/presets'
import * as services from './services'

export default class Vuetify {
  static install: (Vue: VueConstructor) => void
  static version: string

  framework: Record<string, VuetifyServiceInstance> = {}
  installed: string[] = []
  preset: Partial<VuetifyPreset> = {}

  constructor (preset: Partial<VuetifyPreset> = {}) {
    this.preset = preset

    this.use(services.Application)
    this.use(services.Breakpoint)
    this.use(services.Icons)
    this.use(services.Lang)
    this.use(services.Theme)
  }

  // Called on the new vuetify instance
  // bootstrap in install beforeCreate
  // Exposes ssrContext if available
  init (ssrContext?: object) {
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

    this.framework[property] = new Service(this.preset[property])
    this.installed.push(property)
  }
}

Vuetify.install = install
Vuetify.version = __VUETIFY_VERSION__
