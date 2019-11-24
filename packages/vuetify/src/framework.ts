// Install
import { install } from './install'

// Services
import * as services from './services'

// Utilities
import mergeData from './util/mergeData'

// Types
import Vue, { CreateElement } from 'vue'
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

    // Hook into root render method
    this.render(root)

    // Create observed $vuetify object
    this.observe(root)
  }

  observe (instance: Vue) {
    const options = instance.$options as any

    instance.$vuetify = Vue.observable(options.vuetify.framework)
  }

  render (instance: Vue) {
    const rootOptions = instance.$root.$options as any
    const rootRender = rootOptions.render

    rootOptions.render = (h: CreateElement, hack: Record<string, any>) => {
      const rootNode = rootRender.call(instance, h, hack)

      if (!rootNode) return rootNode

      rootNode.data = mergeData(rootNode.data, {
        staticClass: 'v-application--wrap',
      })

      return h('div', {
        staticClass: 'v-application',
        attrs: { 'data-app': true },
        class: {
          'theme--dark': instance.$vuetify.theme.dark,
          'theme--light': !instance.$vuetify.theme.dark,
          'v-application--is-ltr': !instance.$vuetify.rtl,
          'v-application--is-rtl': instance.$vuetify.rtl,
        },
      }, [rootNode])
    }
  }

  // Instantiate a VuetifyService
  use (Service: VuetifyService) {
    const property = Service.property

    if (this.installed.includes(property)) return

    this.framework[property] = new Service(this.preset[property])
    this.installed.push(property)
  }
}
