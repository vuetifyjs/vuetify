/* eslint-disable max-len, import/export, no-use-before-define */
import Vue, { VueConstructor } from 'vue'

export default function mixins<A extends Vue> (CtorA: VueConstructor<A>): VueConstructor<A>
export default function mixins<A extends Vue, B extends Vue> (CtorA: VueConstructor<A>, CtorB: VueConstructor<B>): VueConstructor<A & B>
export default function mixins<A extends Vue, B extends Vue, C extends Vue> (CtorA: VueConstructor<A>, CtorB: VueConstructor<B>, CtorC: VueConstructor<C>): VueConstructor<A & B & C>
export default function mixins<A extends Vue, B extends Vue, C extends Vue, D extends Vue> (CtorA: VueConstructor<A>, CtorB: VueConstructor<B>, CtorC: VueConstructor<C>, CtorD: VueConstructor<D>): VueConstructor<A & B & C & D>
export default function mixins<A extends Vue, B extends Vue, C extends Vue, D extends Vue, E extends Vue> (CtorA: VueConstructor<A>, CtorB: VueConstructor<B>, CtorC: VueConstructor<C>, CtorD: VueConstructor<D>, CtorE: VueConstructor<E>): VueConstructor<A & B & C & D & E>
export default function mixins<A extends Vue, B extends Vue, C extends Vue, D extends Vue, E extends Vue, F extends Vue> (CtorA: VueConstructor<A>, CtorB: VueConstructor<B>, CtorC: VueConstructor<C>, CtorD: VueConstructor<D>, CtorE: VueConstructor<E>, CtorF: VueConstructor<F>): VueConstructor<A & B & C & D & E & F>
export default function mixins<T extends Vue> (...args: VueConstructor[]): VueConstructor<T>
export default function mixins (...args: VueConstructor[]): VueConstructor {
  return Vue.extend({ mixins: args })
}

/**
 * Returns the instance type from a VueConstructor
 * Useful for adding types when using mixins().extend()
 */
export type ExtractVue<A extends VueConstructor, B extends VueConstructor = VueConstructor, C extends VueConstructor = VueConstructor, D extends VueConstructor = VueConstructor, E extends VueConstructor = VueConstructor, F extends VueConstructor = VueConstructor> = ExtractOne<A> & ExtractOne<B> & ExtractOne<C> & ExtractOne<D> & ExtractOne<E> & ExtractOne<F>
type ExtractOne<T extends VueConstructor> = T extends VueConstructor<infer V> ? V : never
