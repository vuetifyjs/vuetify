// Styles
import '../../stylus/components/_windows.styl'

// Components
import { VItemGroup } from '../VItemGroup'

// Types
import { VNode } from 'vue/types/vnode'

/* @vue/component */
export default VItemGroup.extend({
  name: 'v-window',

  props: {
    value: {
      required: false
    },
    vertical: Boolean
  },

  data: () => ({
    height: undefined as undefined | string,
    isActive: false,
    isBooted: false,
    isReverse: false
  }),

  computed: {
    computedTransition (): string {
      if (!this.isBooted) return ''

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

  // Ensure no entry animation
  mounted () {
    this.$nextTick(() => {
      this.isBooted = true
    })
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
