// Styles
import './VSpeedDial.sass'

// Mixins
import Toggleable from '../../mixins/toggleable'
import Positionable from '../../mixins/positionable'
import Transitionable from '../../mixins/transitionable'

// Directives
import ClickOutside from '../../directives/click-outside'

// Types
import mixins from '../../util/mixins'
import { VNode, VNodeData } from 'vue'
import { Prop } from 'vue/types/options'

/* @vue/component */
export default mixins(Positionable, Toggleable, Transitionable).extend({
  name: 'v-speed-dial',

  directives: { ClickOutside },

  props: {
    direction: {
      type: String as Prop<'top' | 'right' | 'bottom' | 'left'>,
      default: 'top',
      validator: (val: string) => {
        return ['top', 'right', 'bottom', 'left'].includes(val)
      },
    },
    openOnHover: Boolean,
    transition: {
      type: String,
      default: 'scale-transition',
    },
  },

  computed: {
    classes (): object {
      return {
        'v-speed-dial': true,
        'v-speed-dial--top': this.top,
        'v-speed-dial--right': this.right,
        'v-speed-dial--bottom': this.bottom,
        'v-speed-dial--left': this.left,
        'v-speed-dial--absolute': this.absolute,
        'v-speed-dial--fixed': this.fixed,
        [`v-speed-dial--direction-${this.direction}`]: true,
        'v-speed-dial--is-active': this.isActive,
      }
    },
  },

  render (h): VNode {
    let children: VNode[] = []
    const data: VNodeData = {
      class: this.classes,
      directives: [{
        name: 'click-outside',
        value: () => (this.isActive = false),
      }],
      on: {
        click: () => (this.isActive = !this.isActive),
      },
    }

    if (this.openOnHover) {
      data.on!.mouseenter = () => (this.isActive = true)
      data.on!.mouseleave = () => (this.isActive = false)
    }

    if (this.isActive) {
      let btnCount = 0
      children = (this.$slots.default || []).map((b, i) => {
        if (b.tag && typeof b.componentOptions !== 'undefined' && (b.componentOptions.Ctor.options.name === 'v-btn' || b.componentOptions.Ctor.options.name === 'v-tooltip')) {
          btnCount++
          return h('div', {
            style: {
              transitionDelay: btnCount * 0.05 + 's',
            },
            key: i,
          }, [b])
        } else {
          b.key = i
          return b
        }
      })
    }

    const list = h('transition-group', {
      class: 'v-speed-dial__list',
      props: {
        name: this.transition,
        mode: this.mode,
        origin: this.origin,
        tag: 'div',
      },
    }, children)

    return h('div', data, [this.$slots.activator, list])
  },
})
