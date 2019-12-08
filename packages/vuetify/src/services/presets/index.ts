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
} from 'vuetify/types/presets'

export class Presets extends Service {
  static property: 'presets' = 'presets'

  constructor (
    preset: Partial<UserVuetifyPreset>,
    parent: InstanceType<typeof Framework>,
  ) {
    super()
    // Copy defaultPreset
    const defaults = mergeDeep({}, Preset)
    // Merge with user provided preset
    const upreset = mergeDeep(defaults, preset)

    let mergedPreset = mergeDeep(
      upreset,
      parent.userPreset
    ) as VuetifyPreset

    // Global preset
    if (mergedPreset.preset) {
      mergedPreset = mergeDeep(
        mergedPreset,
        mergedPreset.preset
      ) as VuetifyPreset
    }

    parent.preset = mergedPreset
  }
}
