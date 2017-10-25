import Vue, { VueConstructor } from 'vue'
import { filterObjectOnKeys } from '../util/helpers'
import { ExtendedVue } from 'vue/types/vue'

const props = {
  absolute: Boolean,
  bottom: Boolean,
  fixed: Boolean,
  left: Boolean,
  right: Boolean,
  top: Boolean
}
type props = Record<keyof typeof props, boolean>

type someProps<S extends keyof props> = { [P in S]: props[P] }
type Positionable<S extends keyof props> = ExtendedVue<Vue, {}, {}, {}, someProps<S>>

// export function factory<S extends keyof props> (selected: S[] = []): Positionable<S> {
export function factory <S extends keyof props> (selected?: S[]): Positionable<S>
export function factory (selected: Array<keyof props>): ExtendedVue<Vue, {}, {}, {}, props>
export function factory (selected: Array<keyof props> = []) {
  return Vue.extend({
    props: selected.length ? filterObjectOnKeys(props, selected) : props
  })
}

export default factory()

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
