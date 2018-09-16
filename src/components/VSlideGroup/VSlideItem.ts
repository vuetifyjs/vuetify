import { VNode, VNodeDirective } from 'vue'
import VItem from '../VItemGroup/VItem'
import VSlideGroup from '../VSlideGroup/VSlideGroup'

type VSlideGroupInstance = InstanceType<typeof VSlideGroup>

export default VItem.extend({
  name: 'v-slide-item',

  render (h): VNode {
    const render = VItem.options.render.call(this, h)
    const itemGroup = this.itemGroup as VSlideGroupInstance

    const data = {
      props: {
        name: itemGroup.computedTransition
      },
      directives: [{
        name: 'show',
        value: this.isActive || itemGroup.showAll
      }] as VNodeDirective[]
    }

    return h('transition', data, [render])
  }
})
