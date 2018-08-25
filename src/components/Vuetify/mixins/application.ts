export type TargetProp = 'bar' | 'bottom' | 'footer' | 'left' | 'right' | 'top'

interface TargetPropValues {
  [uid: number]: number
}

export default {
  bar: 0,
  bottom: 0,
  footer: 0,
  left: 0,
  right: 0,
  top: 0,
  components: {
    bar: {} as TargetPropValues,
    bottom: {} as TargetPropValues,
    footer: {} as TargetPropValues,
    left: {} as TargetPropValues,
    right: {} as TargetPropValues,
    top: {} as TargetPropValues
  },
  bind (uid: number, target: TargetProp, value: number): void {
    if (!this.components[target]) return

    this.components[target] = { [uid]: value }
    this.update(target)
  },
  unbind (uid: number, target: TargetProp): void {
    if (this.components[target][uid] == null) return

    delete (this.components as any)[target][uid]
    this.update(target)
  },
  update (target: TargetProp): void {
    this[target] = Object.values(this.components[target])
      .reduce((acc: number, cur: number): number => (acc + cur), 0)
  }
}
