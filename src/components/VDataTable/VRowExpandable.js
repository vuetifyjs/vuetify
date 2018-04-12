import VRow from './VRow'
import VCell from './VCell'

export default {
  name: 'v-row-expandable',
  components: {
    VRow,
    VCell
  },
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
    }
  },
  created () {
    this.isActive = this.value
  },
  render (h) {
    h('div', {
      staticClass: 'v-row-expandable'
    }, [
      this.$scopedSlots.default({ expanded: this.isActive, toggle: this.toggle }),
      this.isActive && this.$slots.expandable
    ])
  }
}
