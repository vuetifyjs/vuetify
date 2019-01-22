import {
  VuetifyService,
  VuetifyServiceInstance
} from 'vuetify/types/services'
import { VueConstructor } from 'vue'
import defaultPreset from './presets/default'
import { install } from './install'
import { VuetifyPreset } from 'vuetify/types/presets'
import * as services from './services'

export default class Vuetify {
  static install: (Vue: VueConstructor) => void
  static version: string

  framework: Record<string, VuetifyServiceInstance> = {}
  installed: string[] = []
  defaultPreset: VuetifyPreset = defaultPreset
  userPreset?: Partial<VuetifyPreset>

  constructor (preset?: Partial<VuetifyPreset>) {
    this.userPreset = preset

    this.use(services.Application)
    this.use(services.Breakpoint)
    this.use(services.Icons)
    this.use(services.Theme)
  }

  // TODO: Improve merge strategy
  get options (): VuetifyPreset {
    return {
      ...this.defaultPreset,
      ...this.userPreset
    }
  }

  use (Service: VuetifyService) {
    const property = Service.property

    if (this.installed.includes(property)) return

    this.framework[property] = new Service(this.options[property])
  }
}

Vuetify.install = install
Vuetify.version = __VUETIFY_VERSION__
