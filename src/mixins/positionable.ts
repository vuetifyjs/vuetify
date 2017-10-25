import Vue, { ComponentOptions } from 'vue'
import { filterObjectOnKeys } from '../util/helpers'

declare interface props {
  absolute?: boolean,
  bottom?: boolean,
  fixed?: boolean,
  left?: boolean,
  right?: boolean,
  top?: boolean
}

export function factory<S extends props = props> (selected: Array<keyof S> = []): ComponentOptions<
  Vue,
  undefined,
  undefined,
  undefined,
  { [P in keyof S]: boolean }
> {
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

// const test = factory(['top'])
const test = factory()

console.log(test.props.absolute)

export default factory()
