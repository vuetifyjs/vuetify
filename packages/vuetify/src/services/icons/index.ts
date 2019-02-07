// Types
import { VuetifyServiceInstance } from 'vuetify/types/services'
import {
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

  public iconfont: VuetifyIconOptions['iconfont'] = 'md'
  public values: VuetifyIconOptions['values'] = iconFonts[this.iconfont]

  constructor (options: Partial<VuetifyIconOptions> = {}) {
    if (options.iconfont) this.iconfont = options.iconfont

    this.values = {
      ...iconFonts[this.iconfont],
      ...(options.values || {})
    }
  }

  public init () {}
}
