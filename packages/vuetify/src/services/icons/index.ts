// Extensions
import { Service } from '../service'

// Types
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

export class Icons extends Service {
  static property = 'icons'

  public iconfont: VuetifyIconOptions['iconfont'] = 'md'
  public values: VuetifyIconOptions['values'] = iconFonts[this.iconfont]

  constructor (options: Partial<VuetifyIconOptions> = {}) {
    super()
    if (options.iconfont) this.iconfont = options.iconfont

    this.values = {
      ...iconFonts[this.iconfont],
      ...(options.values || {})
    }
  }
}
