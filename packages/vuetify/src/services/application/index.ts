// Extensions
import { Service } from '../service'

// Types
import { TargetPropValues, TargetProp, Application as IApplication } from 'vuetify/types/services/application'

export class Application extends Service implements IApplication {
  static property: 'application' = 'application'

  bar = 0

  top = 0

  left = 0

  insetFooter = 0

  right = 0

  bottom = 0

  footer = 0

  application: Dictionary<TargetPropValues> = {
    bar: {},
    top: {},
    left: {},
    insetFooter: {},
    right: {},
    bottom: {},
    footer: {},
  }

  register (
    uid: number,
    location: TargetProp,
    size: number
  ) {
    this.application[location][uid] = size

    this.update(location)
  }

  unregister (uid: number, location: TargetProp) {
    if (this.application[location][uid] == null) return

    delete this.application[location][uid]
    this.update(location)
  }

  update (location: TargetProp) {
    this[location] = Object.values(this.application[location])
      .reduce((acc: number, cur: number): number => (acc + cur), 0)
  }
}
