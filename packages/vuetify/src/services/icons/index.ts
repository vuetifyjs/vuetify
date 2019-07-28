// Extensions
import { Service } from '../service'

// Types
import { VuetifyIconOptions } from 'vuetify/types/services/icons'

// Presets
import presets from './presets'

export class Icons extends Service {
  static property = 'icons'

  public iconfont: VuetifyIconOptions['iconfont'] = 'mdi'

  public values: VuetifyIconOptions['values'] = presets[this.iconfont]

  constructor (options: Partial<VuetifyIconOptions> = {}) {
    super()
    if (options.iconfont) this.iconfont = options.iconfont

    this.values = {
      ...presets[this.iconfont],
      ...(options.values || {}),
    }
  }
}
