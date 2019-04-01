// Types
import { VuetifyUseOptions } from 'vuetify/types'
import {
  VuetifyService,
  VuetifyServiceContract
} from 'vuetify/types/services'
import { VuetifyPreset } from 'vuetify/types/presets'
import Vue, { VueConstructor } from 'vue'

// Services
import * as services from './services'

// Styles
import './styles/main.sass'

export default class Vuetify {
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

  static install (Vue: VueConstructor, args: VuetifyUseOptions = {}) {
    if (this.installed) return
    this.installed = true

    const directives = args.directives
    for (const name in directives) {
      const directive = directives[name]

      Vue.directive(name, directive)
    }

    (function registerComponents (components) {
      if (components) {
        for (const key in components) {
          const component = components[key]
          if (component && !registerComponents(component.$_vuetify_subcomponents)) {
            Vue.component(key, component as typeof Vue)
          }
        }
        return true
      }
      return false
    })(args.components)

    Vue.mixin({
      beforeCreate () {
        const options = this.$options as any

        if (options.vuetify) {
          options.vuetify.init(this, options.ssrContext)
          this.$vuetify = Vue.observable(options.vuetify.framework)
        } else {
          this.$vuetify = (options.parent && options.parent.$vuetify) || this
        }
      }
    })
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
