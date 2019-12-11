// Preset
import { preset as Preset } from '../../presets/default'

// Utilities
import { consoleWarn } from '../../util/console'
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

    // The default preset
    const defaultPreset = mergeDeep({}, Preset)
    // The user provided preset
    const { userPreset } = parent
    // The user provided global preset
    const {
      preset: globalPreset = {},
      ...preset
    } = userPreset

    if (globalPreset.preset != null) {
      consoleWarn('Global presets do not support the **preset** option, it can be safely omitted')
    }

    parent.preset = mergeDeep(
      mergeDeep(defaultPreset, globalPreset),
      preset
    ) as VuetifyPreset
  }
}
