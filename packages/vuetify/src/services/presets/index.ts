// Preset
import { Preset } from '../../presets/default'

// Utilities
import { mergeDeep } from '../../util/helpers'

// Types
import Framework from 'vuetify/types'
import { Service } from '../service'
import {
  UserVuetifyPreset,
  VuetifyPreset,
} from 'vuetify/types/services/presets'

export class Presets extends Service {
  static property: 'presets' = 'presets'

  constructor (
    parentPreset: Partial<UserVuetifyPreset>,
    parent: InstanceType<typeof Framework>,
  ) {
    super()

    // The user provided preset
    const { userPreset } = parent
    // The default preset
    const defaultPreset = mergeDeep({}, Preset)
    // The user provided global preset
    const globalPreset = mergeDeep(defaultPreset, userPreset.preset || {})

    parent.preset = mergeDeep(globalPreset, userPreset) as VuetifyPreset
  }
}
