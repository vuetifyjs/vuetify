import { inject, warn } from 'vue'

// Types
import {
  UserVuetifyPreset,
  VuetifyPreset,
} from 'vuetify/types/services/presets'
import {
  VuetifyService,
  VuetifyServiceContract,
} from 'vuetify/types/services'

// Services
import * as services from './services'

export const VuetifySymbol = Symbol.for('vuetify')

export function useVuetify () {
  const vuetify = inject(VuetifySymbol)

  if (!vuetify) {
    warn('Vuetify has not been installed on this app')
  }

  return vuetify
}

export const version = __VUETIFY_VERSION__

export default class Vuetify {
  public framework: Dictionary<VuetifyServiceContract> = {}

  public installed: string[] = []

  public preset = {} as VuetifyPreset

  public userPreset: UserVuetifyPreset = {}

  constructor (userPreset: UserVuetifyPreset = {}) {
    this.userPreset = userPreset

    this.use(services.Presets)
    this.use(services.Application)
    this.use(services.Breakpoint)
    this.use(services.Goto)
    this.use(services.Icons)
    this.use(services.Lang)
    this.use(services.Theme)

    this.init()
  }

  // Called on the new vuetify instance
  // bootstrap in install beforeCreate
  // Exposes ssrContext if available
  init () {
    this.installed.forEach(property => {
      const service = this.framework[property]

      service.framework = this.framework

      service.init()
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

    // TODO maybe a specific type for arg 2?
    this.framework[property] = new Service(this.preset, this as any)
    this.installed.push(property)
  }
}
