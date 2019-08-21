export type TargetProp = 'bar' | 'top' | 'right' | 'bottom' | 'left' | 'footer' | 'insetFooter'

interface TargetPropValues {
  [uid: number]: number
}

export interface Application {
  bar: number
  top: number
  left: number
  insetFooter: number
  right: number
  bottom: number
  footer: number
  application: Record<string, TargetPropValues>

  register (
    uid: number,
    location: TargetProp,
    size: number
  ): void
  unregister (uid: number, location: TargetProp): void
  update (location: TargetProp): void
}
