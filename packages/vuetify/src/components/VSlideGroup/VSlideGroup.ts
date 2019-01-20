// Styles
import './VSlideGroup.sass'

// Components
import VIcon from '../VIcon'

// Extensions
import { BaseItemGroup } from '../VItemGroup/VItemGroup'

// Types
import { VNode } from 'vue'

export default BaseItemGroup.extend({
  name: 'VSlideGroup',

  provide (): object {
    return {
      slideGroup: this
    }
  },

  computed: {
    __cachedAppend (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-item-group__append'
      }, [this.genIcon('append')])
    },
    __cachedPrepend (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-item-group__append'
      }, [this.genIcon('prepend')])
    }
  },

  methods: {
    genAppend (): VNode {
      const children = [
        this.$slots.append || this.__cachedAppend,
        this.$scopedSlots.append && this.$scopedSlots.append({})
      ]

      return this.$createElement('div', {
        staticClass: 'v-slide-group__append'
      }, children)
    },
    genContent (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-slide-group__content'
      }, this.$slots.default)
    },
    genIcon (location: 'prepend' | 'append'): VNode {
      return this.$createElement(VIcon, {
        props: {
          [location === 'prepend' ? 'left' : 'right']: true
        }
      })
    },
    genPrepend (): VNode {
      const children = [
        this.$slots.prepend || this.__cachedPrepend,
        this.$scopedSlots.prepend && this.$scopedSlots.prepend({})
      ]

      return this.$createElement('div', {
        staticClass: 'v-slide-group__prepend'
      }, children)
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-item-group v-slide-group',
      class: this.classes
    }, [
      this.genPrepend(),
      this.genContent(),
      this.genAppend()
    ])
  }
})
