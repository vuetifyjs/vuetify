import {
  VuetifyService,
  VuetifyServiceInstance,
} from 'vuetify/types/services'
import Vue, { VueConstructor } from 'vue'
import { install } from './install'
import defaultPreset from './presets/default'
import * as services from './services'
import { keys as objectKeys } from './util/helpers'

export default class Vuetify {
  framework: Record<string, VuetifyServiceInstance> = {}
  userPreset: any
  rootInstance: Vue | undefined = undefined

  static install: (Vue: VueConstructor) => void
  static version: string

  constructor (options?: any) {
    this.registerPreset(options)
    this.registerServices()
  }

  get preset () {
    return this.mergeOptions(this.userPreset, defaultPreset)
  }

  registerPreset (preset: any) {
    this.userPreset = preset
  }

  private mergeOptions (
    preset: any,
    defaultPreset: any
  ): any {
    if (preset == null) return defaultPreset

    return {
      ssr: preset.ssr != undefined ? preset.ssr : defaultPreset.ssr,
      locale: {
        ...defaultPreset.locale,
        ...preset.locale
      },
      icons: {
        iconfont: (
          preset.icons!.iconfont ||
          defaultPreset.icons.iconfont
        ),
        values: {
          ...defaultPreset.icons.values,
          ...preset.icons!.values
        }
      },
      theme: {
        default: (
          preset.theme!.default ||
          defaultPreset.theme.default
        ),
        themes: {
          ...defaultPreset.theme.themes,
          ...preset.theme!.themes
        }
      }
    }
  }

  private registerServices () {
    objectKeys(services).forEach(key => {
      const service: VuetifyService = services[key]
      const property = service.property
      const options = this.preset[property]

      this.framework[property] = new service(options)
    })
  }
}

Vuetify.install = install
Vuetify.version = __VUETIFY_VERSION__
