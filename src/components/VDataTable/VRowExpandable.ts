import Vue, { VNode, CreateElement, VNodeChildrenArrayContents } from 'vue'

import ExpandTransitionGenerator from '../transitions/expand-transition'

export default Vue.extend({
  name: 'v-row-expandable',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  watch: {
    value (v) {
      this.isActive = v
    }
  },
  methods: {
    toggle () {
      this.isActive = !this.isActive
      this.$emit('input', this.isActive)
    },
    genTransition (h: CreateElement): VNode {
      const wrapper = h('div', {
        class: 'v-row-expandable__wrapper'
      }, this.$slots.expansion)

      const children = []

      if (this.isActive) {
        children.push(wrapper)
      }

      return h('transition', {
        on: ExpandTransitionGenerator('v-row-expandable--expanded')
      }, children)
    },
    genRow (h: CreateElement): string | VNodeChildrenArrayContents {
      const content: VNodeChildrenArrayContents = []

      if (this.$scopedSlots.default) {
        content.push(this.$scopedSlots.default({ expanded: this.isActive, toggle: this.toggle }))
      } else {
        content.push(this.$slots.default)
      }

      return content
    }
  },
  created () {
    this.isActive = this.value
  },
  render (h): VNode {
    return h('div', {
      staticClass: 'v-row-expandable'
    }, [
      ...this.genRow(h),
      this.genTransition(h)
    ])
  }
})
