/* eslint-disable max-len, import/export */
import Vue, { VueConstructor, ComponentOptions } from 'vue'

type Component<T extends Vue> = ComponentOptions<T> | VueConstructor<T>

export default function mixins<A extends Vue> (CtorA: Component<A>): VueConstructor<A>
export default function mixins<A extends Vue, B extends Vue> (CtorA: Component<A>, CtorB: Component<B>): VueConstructor<A & B>
export default function mixins<A extends Vue, B extends Vue, C extends Vue> (CtorA: Component<A>, CtorB: Component<B>, CtorC: Component<C>): VueConstructor<A & B & C>
export default function mixins<A extends Vue, B extends Vue, C extends Vue, D extends Vue> (CtorA: Component<A>, CtorB: Component<B>, CtorC: Component<C>, CtorD: Component<D>): VueConstructor<A & B & C & D>
export default function mixins<A extends Vue, B extends Vue, C extends Vue, D extends Vue, E extends Vue> (CtorA: Component<A>, CtorB: Component<B>, CtorC: Component<C>, CtorD: Component<D>, CtorE: Component<E>): VueConstructor<A & B & C & D & E>
export default function mixins<A extends Vue, B extends Vue, C extends Vue, D extends Vue, E extends Vue, F extends Vue> (CtorA: Component<A>, CtorB: Component<B>, CtorC: Component<C>, CtorD: Component<D>, CtorE: Component<E>, CtorF: Component<F>): VueConstructor<A & B & C & D & E & F>
export default function mixins (...args: Component<Vue>[]): any {
  return Vue.extend({ mixins: args })
}
