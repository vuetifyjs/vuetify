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
    hasActiveItems (): boolean {
      return Boolean(
        this.items.find(item => !item.disabled)
      )
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
    getNextIndex (index: number): number {
      const nextIndex = (index + 1) % this.items.length
      const item = this.items[nextIndex]

      if (item.disabled) return this.getNextIndex(nextIndex)

      return nextIndex
    },
    getPrevIndex (index: number): number {
      const prevIndex = (index + this.items.length - 1) % this.items.length
      const item = this.items[prevIndex]

      if (item.disabled) return this.getPrevIndex(prevIndex)

      return prevIndex
    },
    next () {
      this.isReverse = false

      if (!this.hasActiveItems) return

      const nextIndex = this.getNextIndex(this.internalIndex)
      const item = this.items[nextIndex]

      this.internalValue = this.getValue(item, nextIndex)
    },
    prev () {
      this.isReverse = true

      if (!this.hasActiveItems) return

      const lastIndex = this.getPrevIndex(this.internalIndex)
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
