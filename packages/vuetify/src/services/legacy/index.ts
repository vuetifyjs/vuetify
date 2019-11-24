// Extensions
import { Service } from '../service'

// Types
import { Legacy as ILegacy } from 'vuetify/types/services/legacy'

export class Legacy extends Service implements ILegacy {
  static property = 'legacy'

  grid = false

  constructor (options: Partial<ILegacy> = {}) {
    super()

    return {
      grid: this.grid,
      framework: {},
      init () {},
    }
  }
}
