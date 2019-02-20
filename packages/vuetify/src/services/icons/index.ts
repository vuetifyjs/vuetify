// Extensions
import { Service } from '../service'

// Types
import { VuetifyIconOptions } from 'vuetify/types/services/icons'

export class Icons extends Service {
  static property = 'icons'

  public values: VuetifyIconOptions['values']

  constructor (
    options: Partial<VuetifyIconOptions['values']> = {},
    defaultOptions: VuetifyIconOptions['values']
  ) {
    super()

    this.values = Object.assign({},
      defaultOptions,
      options
    )
  }
}
