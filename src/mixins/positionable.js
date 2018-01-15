import { filterObjectOnKeys } from '../util/helpers'

export function factory (selected = []) {
  const props = {
    absolute: Boolean,
    bottom: Boolean,
    fixed: Boolean,
    left: Boolean,
    right: Boolean,
    top: Boolean
  }

  return {
    name: 'positionable',
    props: selected.length ? filterObjectOnKeys(props, selected) : props
  }
}

export default factory()
