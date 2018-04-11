import { DecoratedClass, VueClass } from 'vue-class-component/lib/declarations'
import { Vue } from 'vue/types/vue'

declare type props = {
  absolute: boolean,
  bottom: boolean,
  fixed: boolean,
  left: boolean,
  right: boolean,
  top: boolean
}

declare type someProps<S extends keyof props> = { [P in S]: props[P] }

declare type Positionable<S extends keyof props> = VueClass<Vue & someProps<S>>

export declare function factory<S extends keyof props> (selected?: S[]): Positionable<S>

declare const pos: Positionable<keyof props>
export default pos
