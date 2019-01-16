import {
  VuetifyService,
  VuetifyServiceInstance,
} from 'vuetify/types/services'
import { VueConstructor } from 'vue'
import defaultPreset from './presets/default'
import { install } from './install'
import { VuetifyPreset } from 'vuetify/types/presets'
import * as services from './services'

export default class Vuetify {
  framework: Record<string, VuetifyServiceInstance> = {}
  installed: string[] = []
  defaultPreset: VuetifyPreset = defaultPreset
  userPreset?: Partial<VuetifyPreset>

  static install: (Vue: VueConstructor) => void
  static version: string

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

  use (service: VuetifyService) {
    const property = service.property

    if (this.installed.includes(property)) return

    this.framework[property] = new service(this.options[property])
  }
}

Vuetify.install = install
Vuetify.version = __VUETIFY_VERSION__
