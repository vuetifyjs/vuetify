// Extensions
import { Service } from '../service'

// Utilities
import { mergeDeep } from '../../util/helpers'

// Types
import { VuetifyPreset } from 'vuetify/types/presets'
import {
  Icons as IIcons,
  VuetifyIcons,
} from 'vuetify/types/services/icons'

// Presets
import presets from './presets'

export class Icons extends Service implements IIcons {
  static property: 'icons' = 'icons'

  public iconfont: IIcons['iconfont']

  public values: IIcons['values']

  constructor (preset: VuetifyPreset) {
    super()

    const {
      iconfont,
      values,
    } = preset[Icons.property]

    this.iconfont = iconfont
    this.values = mergeDeep(
      presets[iconfont] as VuetifyIcons,
      values
    ) as IIcons['values']
  }
}
