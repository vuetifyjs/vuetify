import Vue from 'vue'
import { filterObjectOnKeys } from '../util/helpers'
import { OptionsVue, VueConstructor } from 'vue/types/vue'

const availableProps = {
  absolute: Boolean,
  bottom: Boolean,
  fixed: Boolean,
  left: Boolean,
  right: Boolean,
  top: Boolean
}
type props = Record<keyof typeof availableProps, boolean>

export type Positionable<S extends keyof props> = VueConstructor<Vue & { [P in S]: boolean }, { [P in S]: BooleanConstructor }>

export function factory <S extends keyof props> (selected?: S[]): Positionable<S>
export function factory (selected: undefined): OptionsVue<Vue, {}, {}, {}, props, typeof availableProps>
export function factory (selected: any[] = []): any {
  return Vue.extend({
    name: 'positionable',
    props: selected.length ? filterObjectOnKeys(availableProps, selected) : availableProps
  })
}

export default factory()

// Add a `*` before the second `/`
/* Tests /
let single = factory(['top']).extend({
  created () {
    this.top
    this.bottom
    this.absolute
  }
})

let some = factory(['top', 'bottom']).extend({
  created () {
    this.top
    this.bottom
    this.absolute
  }
})

let all = factory().extend({
  created () {
    this.top
    this.bottom
    this.absolute
    this.foobar
  }
})
/**/
