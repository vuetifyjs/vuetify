// Types
import Framework from 'vuetify/types'
import { Service } from '../service'
import { VuetifyPreset } from 'vuetify/types/presets'

export class Presets extends Service {
  static property: 'presets'

  constructor (
    preset: Partial<VuetifyPreset>,
    parent: InstanceType<typeof Framework>,
  ) {
    super()

    parent.preset = Object.assign({},
      preset,
      parent.defaultPreset,
      parent.userPreset,
    )
  }
}
