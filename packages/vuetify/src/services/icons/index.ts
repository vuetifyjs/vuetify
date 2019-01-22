// Types
import { VuetifyServiceInstance } from 'vuetify/types/services'
import {
  VuetifyIcons,
  VuetifyIconSets,
  VuetifyIconOptions
} from 'vuetify/types/services/icons'

// Presets
import md from './presets/md'
import mdi from './presets/mdi'
import fa from './presets/fa'
import fa4 from './presets/fa4'

const iconFonts: VuetifyIconSets = Object.freeze({
  md, mdi, fa, fa4
})

export class Icons implements VuetifyServiceInstance {
  static property = 'icons'

  public iconfont: string = 'md'
  public values: VuetifyIcons = iconFonts[this.iconfont]

  constructor (options: Partial<VuetifyIconOptions> = {}) {
    if (options.iconfont) {
      this.iconfont = options.iconfont
    }

    if (options.values) {
      this.values = {
        ...options.values,
        ...iconFonts[this.iconfont]
      }
    }
  }
}
