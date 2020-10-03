import { defineComponent, DefineComponent } from 'vue'
import { filterObjectOnKeys } from '../../util/helpers'

const availableProps = {
  absolute: Boolean,
  bottom: Boolean,
  fixed: Boolean,
  left: Boolean,
  right: Boolean,
  top: Boolean,
}
type props = Record<keyof typeof availableProps, boolean>

export type Positionable<S extends keyof props> = DefineComponent<{ [P in S]: BooleanConstructor }, unknown, unknown, {}, {}>

export function factory <S extends keyof props> (selected?: S[]): Positionable<S>
export function factory (selected: undefined): Positionable<keyof typeof availableProps>
export function factory (selected: any[] = []): any {
  return defineComponent({
    name: 'positionable',
    props: selected.length ? filterObjectOnKeys(availableProps, selected) : availableProps,
  })
}

export default factory()

// Add a `*` before the second `/`
/* Tests /
let single = defineComponent({
  extends: factory(['top']),
  created () {
    this.top
    this.bottom
    this.absolute
  }
})

let some = defineComponent({
  extends: factory(['top', 'bottom']),
  created () {
    this.top
    this.bottom
    this.absolute
  }
})

let all = defineComponent({
  extends: factory(),
  created () {
    this.top
    this.bottom
    this.absolute
    this.foobar
  }
})
/**/
