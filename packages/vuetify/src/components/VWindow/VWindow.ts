// Styles
import '../../stylus/components/_windows.styl'

// Components
import { BaseItemGroup } from '../VItemGroup/VItemGroup'

// Directives
import Touch from '../../directives/touch'

// Types
import { VNode, VNodeDirective } from 'vue/types/vnode'

/* @vue/component */
export default BaseItemGroup.extend({
  name: 'v-window',

  provide (): object {
    return {
      windowGroup: this
    }
  },

  directives: { Touch },

  props: {
    mandatory: {
      type: Boolean,
      default: true
    },
    reverse: {
      type: Boolean,
      default: undefined
    },
    touch: Object,
    touchless: Boolean,
    value: {
      required: false
    },
    vertical: Boolean
  },

  data () {
    return {
      internalHeight: undefined as undefined | string,
      isActive: false,
      isBooted: false,
      isReverse: false
    }
  },

  computed: {
    computedTransition (): string {
      if (!this.isBooted) return ''

      const axis = this.vertical ? 'y' : 'x'
      const direction = this.internalReverse === !this.$vuetify.rtl
        ? '-reverse'
        : ''

      return `v-window-${axis}${direction}-transition`
    },
    internalIndex (): number {
      return this.items.findIndex((item, i) => {
        return this.internalValue === this.getValue(item, i)
      })
    },
    internalReverse (): boolean {
      if (this.reverse !== undefined) return this.reverse

      return this.isReverse
    }
  },

  watch: {
    internalIndex: 'updateReverse'
  },

  mounted () {
    this.$nextTick(() => (this.isBooted = true))
  },

  methods: {
    genContainer (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-window__container',
        class: {
          'v-window__container--is-active': this.isActive
        },
        style: {
          height: this.internalHeight
        }
      }, this.$slots.default)
    },
    next () {
      this.isReverse = false
      const nextIndex = (this.internalIndex + 1) % this.items.length
      const item = this.items[nextIndex]

      this.internalValue = this.getValue(item, nextIndex)
    },
    prev () {
      this.isReverse = true
      const lastIndex = (this.internalIndex + this.items.length - 1) % this.items.length
      const item = this.items[lastIndex]

      this.internalValue = this.getValue(item, lastIndex)
    },
    updateReverse (val: number, oldVal: number) {
      this.isReverse = val < oldVal
    }
  },

  render (h): VNode {
    const data = {
      staticClass: 'v-window',
      directives: [] as VNodeDirective[]
    }

    if (!this.touchless) {
      const value = this.touch || {
        left: this.next,
        right: this.prev
      }

      data.directives.push({
        name: 'touch',
        value
      })
    }

    return h('div', data, [this.genContainer()])
  }
})
