// Styles
import '../../stylus/components/_windows.styl'

// Components
import { VItemGroup } from '../VItemGroup'

// Types
import { VNode } from 'vue/types/vnode'

export default VItemGroup.extend({
  name: 'v-window',

  props: {
    value: {
      type: Number,
      default: undefined
    },
    vertical: Boolean
  },

  data: () => ({
    height: undefined as undefined | string,
    isActive: false,
    isReverse: false
  }),

  computed: {
    computedTransition (): string {
      const axis = this.vertical ? 'y' : 'x'
      const direction = this.isReverse ? '-reverse' : ''

      return `v-window-${axis}${direction}-transition`
    },
    internalIndex (): number {
      return this.items.findIndex((item, i) => {
        return this.internalValue === this.getValue(item, i)
      })
    }
  },

  watch: {
    internalIndex (val, oldVal) {
      this.isReverse = val < oldVal
    }
  },

  methods: {
    genContainer (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-window__container',
        class: {
          'v-window__container--is-active': this.isActive
        },
        style: {
          height: this.height
        }
      }, [this.$slots.default])
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-window'
    }, [this.genContainer()])
  }
})
