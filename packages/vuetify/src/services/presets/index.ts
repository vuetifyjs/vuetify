// Utilities
import { mergeDeep } from '../../util/helpers'

// Types
import Framework from 'vuetify/types'
import { Service } from '../service'
import {
  UserVuetifyPreset,
  VuetifyPreset,
} from 'vuetify/types/presets'

export class Presets extends Service {
  static property: 'presets' = 'presets'

  preset: VuetifyPreset

  constructor (
    preset: Partial<UserVuetifyPreset>,
    parent: InstanceType<typeof Framework>,
  ) {
    super()

    const {
      defaultPreset,
      userPreset,
    } = parent

    const defaults = mergeDeep({}, defaultPreset)
    const upreset = mergeDeep(defaults, preset)

    this.preset = parent.preset = mergeDeep(
      upreset,
      userPreset
    ) as VuetifyPreset
  }
}
