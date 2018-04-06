import { filterObjectOnKeys } from '../util/helpers'
import { ComponentOptions } from 'vue'
import { Vue } from 'vue/types/vue'

declare interface props {
  absolute?: BooleanConstructor,
  bottom?: BooleanConstructor,
  fixed?: BooleanConstructor,
  left?: BooleanConstructor,
  right?: BooleanConstructor,
  top?: BooleanConstructor
}

export function factory <S extends props = props> (selected?: Array<keyof S>): ComponentOptions<
  Vue,
  undefined,
  undefined,
  undefined,
  { [P in keyof S]: boolean }
>
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

export declare interface factory {
  new (...args: any[]): Vue
}
