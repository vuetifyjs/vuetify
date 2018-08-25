import Vue, { VNode } from 'vue'
import { Prop } from 'vue/types/options'

export default Vue.extend({
  name: 'slot-provider',

  provide () {
    return this.provide
  },

  props: {
    provide: Object as Prop<Record<string, any>>
  },

  render (): VNode {
    return this.$slots.default! && this.$slots.default.find(node => !node.isComment && node.text !== ' ')!
  }
})
