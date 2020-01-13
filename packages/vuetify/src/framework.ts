import {
  InjectionKey,
  inject,
  warn,
} from 'vue'

// Preset
import { preset as Preset } from './presets/default'

// Utilities
import { mergeDeep } from './util/helpers'

// Types
import {
  VuetifyUserPreset,
  VuetifyPreset,
} from 'vuetify/types'
import {
  VuetifyService,
  VuetifyServiceContract,
} from 'vuetify/types/services'

// Services
import * as services from './services'

export const VuetifySymbol: InjectionKey<Dictionary<VuetifyServiceContract>> = Symbol.for('vuetify')

export function useVuetify () {
  const vuetify = inject(VuetifySymbol)

  /* istanbul ignore if */
  if (!vuetify) {
    warn('Vuetify has not been installed on this app')
  }

  return vuetify
}

export default class Vuetify {
  public framework: Dictionary<VuetifyServiceContract> = {}

  public preset = {} as VuetifyPreset

  constructor (userPreset: VuetifyUserPreset = {}) {
    this.init(userPreset)
  }

  // Called on the new vuetify instance
  // bootstrap in install beforeCreate
  // Exposes ssrContext if available
  init (userPreset: VuetifyUserPreset) {
    this.preset = this.mergePreset(userPreset)

    let key: keyof typeof services
    for (key in services) {
      const service = services[key]

      this.use(service)

      // TODO: remove if https://www.notion.so/vuetify/0006-create-scroll-service-13bf10dcda0b447ea0bd3e9729c87e32
      // is approved
      this.framework[service.property].framework = this.framework
    }

    // rtl is not installed and
    // will never be called by
    // the init process
    this.framework.rtl = Boolean(this.preset.rtl) as any
  }

  mergePreset ({ preset, ...userPreset }: VuetifyUserPreset) {
    return mergeDeep(mergeDeep(Preset, preset), userPreset) as VuetifyPreset
  }

  // Instantiate a VuetifyService
  use (Service: VuetifyService) {
    const property = Service.property

    if (property in this.framework) return

    this.framework[property] = new Service(this.preset)
  }
}
