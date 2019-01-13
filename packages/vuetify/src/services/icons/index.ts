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

  public options: VuetifyIconOptions

  constructor (options?: VuetifyIconOptions) {
    options = {
      iconfont: 'md',
      values: {},
      ...(options || {})
    } as VuetifyIconOptions

    this.options = {
      ...options,
      values: {
        ...options.values,
        ...iconFonts[options.iconfont]
      }
    }
  }
}
