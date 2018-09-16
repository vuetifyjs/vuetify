import { VNode, VNodeDirective } from 'vue'
import VItem from '../VItemGroup/VItem'

export default VItem.extend({
  name: 'v-slide-item',

  render (h): VNode {
    const render = VItem.options.render.call(this, h)

    const data = {
      props: {
        name: this.itemGroup.computedTransition
      },
      directives: [{
        name: 'show',
        value: this.isActive || this.itemGroup.linear
      }] as VNodeDirective[]
    }

    return h('transition', data, [render])
  }
})
