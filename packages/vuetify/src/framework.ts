// Install
import { install } from './install'

// Services
import * as services from './services'

// Types
import Vue from 'vue'
import { VuetifyPreset } from 'vuetify/types/presets'
import {
  VuetifyService,
  VuetifyServiceContract,
} from 'vuetify/types/services'

// Styles
import './styles/main.sass'

export default class Vuetify {
  static install = install

  static installed = false

  static version = __VUETIFY_VERSION__

  framework: Record<string, VuetifyServiceContract> = { rtl: false as any }

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
    this.use(services.Legacy)
  }

  bootstrap (root: Vue, ssrContext?: object) {
    this.installed.forEach(property => {
      const service = this.framework[property]

      service.framework = this.framework

      service.init(root, ssrContext)
    })
  }

  // Invoked in beforeCreate of
  // the root Vue element
  init (root: Vue, ssrContext?: object) {
    // Iterate all installed services
    // to bootstrap framework object
    this.bootstrap(root, ssrContext)

    // Create observed $vuetify object
    this.observe(root)
  }

  observe (instance: Vue) {
    const options = instance.$options as any

    instance.$vuetify = Vue.observable(options.vuetify.framework)
  }

  // Instantiate a VuetifyService
  use (Service: VuetifyService) {
    const property = Service.property

    if (this.installed.includes(property)) return

    this.framework[property] = new Service(this.preset[property])
    this.installed.push(property)
  }
}
