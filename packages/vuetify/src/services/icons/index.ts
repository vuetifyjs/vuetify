// Extensions
import { Service } from '../service'

// Types
import { VuetifyPreset } from 'vuetify/types/presets'
import { Icons as IIcons } from 'vuetify/types/services/icons'

// Presets
import presets from './presets'

export class Icons extends Service implements IIcons {
  static property = 'icons'

  public iconfont: IIcons['iconfont']

  public values: IIcons['values']

  constructor (preset: VuetifyPreset) {
    super()

    const iicon: IIcons = preset[Icons.property]
    const {
      iconfont,
      values,
    } = iicon

    this.iconfont = iconfont
    this.values = Object.assign({},
      presets[iconfont],
      values,
    )
  }
}
