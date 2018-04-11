import { filterObjectOnKeys } from '../util/helpers'

const props = {
  absolute: Boolean,
  bottom: Boolean,
  fixed: Boolean,
  left: Boolean,
  right: Boolean,
  top: Boolean
}
declare type props = typeof props

export function factory <S extends keyof props> (selected?: S[]): {
  name: string,
  props: { [P in S]: props[P] }
}
export function factory (selected: Array<keyof props> = []): { name: string, props: props } {
  return {
    name: 'positionable',
    props: selected.length ? filterObjectOnKeys(props, selected) : props
  }
}

export default factory()
