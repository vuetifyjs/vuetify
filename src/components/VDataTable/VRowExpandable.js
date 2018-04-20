import ExpandTransitionGenerator from '../transitions/expand-transition'

export default {
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
    genTransition (h) {
      const wrapper = h('div', {
        class: 'v-row-expandable__wrapper'
      }, this.$slots.expansion)

      const children = []

      if (this.isActive) {
        children.push(wrapper)
      }

      const transition = h('transition', {
        on: ExpandTransitionGenerator('v-row-expandable--expanded')
      }, children)

      return transition
    },
    genRow (h) {
      return this.$scopedSlots.default && this.$scopedSlots.default({ expanded: this.isActive, toggle: this.toggle }) || this.$slots.default
    }
  },
  created () {
    this.isActive = this.value
  },
  render (h) {
    return h('div', {
      staticClass: 'v-row-expandable'
    }, [
      this.genRow(h),
      this.genTransition(h)
    ])
  }
}
