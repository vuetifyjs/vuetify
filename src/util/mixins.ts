import { VueConstructor } from 'vue'
import Vue from 'vue'

export default function mixins<A extends Vue>(CtorA: VueConstructor<A>): VueConstructor<A>
export default function mixins<A extends Vue, B extends Vue>(CtorA: VueConstructor<A>, CtorB: VueConstructor<B>): VueConstructor<A & B>
export default function mixins<A extends Vue, B extends Vue, C extends Vue>(CtorA: VueConstructor<A>, CtorB: VueConstructor<B>, CtorC: VueConstructor<C>): VueConstructor<A & B & C>
export default function mixins<A extends Vue, B extends Vue, C extends Vue, D extends Vue>(CtorA: VueConstructor<A>, CtorB: VueConstructor<B>, CtorC: VueConstructor<C>, CtorD: VueConstructor<D>): VueConstructor<A & B & C & D>
export default function mixins<A extends Vue, B extends Vue, C extends Vue, D extends Vue, E extends Vue>(CtorA: VueConstructor<A>, CtorB: VueConstructor<B>, CtorC: VueConstructor<C>, CtorD: VueConstructor<D>, CtorE: VueConstructor<E>): VueConstructor<A & B & C & D & E>
export default function mixins<A extends Vue, B extends Vue, C extends Vue, D extends Vue, E extends Vue, F extends Vue>(CtorA: VueConstructor<A>, CtorB: VueConstructor<B>, CtorC: VueConstructor<C>, CtorD: VueConstructor<D>, CtorE: VueConstructor<E>, CtorF: VueConstructor<F>): VueConstructor<A & B & C & D & E & F>
export default function mixins (...args: VueConstructor[]) {
  return Vue.extend({ mixins: args })
}
