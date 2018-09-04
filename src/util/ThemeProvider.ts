import { VNode } from 'vue'
import Themeable from '../mixins/themeable'
import mixins from './mixins'

/* @vue/component */
export default mixins(Themeable).extend({
  name: 'theme-provider',

  render (): VNode {
    return this.$slots.default! && this.$slots.default.find(node => !node.isComment && node.text !== ' ')!
  }
})
