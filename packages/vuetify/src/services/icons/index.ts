// Extensions
import { Service } from '../service'

// Types
import { Icons as IIcons } from 'vuetify/types/services/icons'

// Presets
import presets from './presets'

export class Icons extends Service implements IIcons {
  static property = 'icons'

  public iconfont: IIcons['iconfont'] = 'mdi'

  public values: IIcons['values'] = presets[this.iconfont]

  constructor (options: Partial<IIcons> = {}) {
    super()
    if (options.iconfont) this.iconfont = options.iconfont

    this.values = {
      ...presets[this.iconfont],
      ...(options.values || {}),
    }
  }
}
