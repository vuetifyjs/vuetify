import { VuetifyServiceInstance } from 'vuetify/types/services'

export type TargetProp = 'bar' | 'bottom' | 'footer' | 'insetFooter' | 'left' | 'right' | 'top'
interface TargetPropValues {
  [uid: number]: number
}

export class Layout implements VuetifyServiceInstance {
  static property = 'layout'

  bar = 0
  top = 0
  left = 0
  insetFooter = 0
  right = 0
  bottom = 0
  footer = 0

  application: Record<string, TargetPropValues> = {
    bar: {},
    top: {},
    left: {},
    insetFooter: {},
    right: {},
    bottom: {},
    footer: {}
  }

  constructor (options?: any) {
    //
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
