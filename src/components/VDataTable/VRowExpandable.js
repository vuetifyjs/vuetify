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
  computed: {
    classes () {
      return {
        'v-row-expandable': true
      }
    }
  },
  methods: {
    toggle () {
      this.isActive = !this.isActive
      this.$emit('input', this.isActive)
    },
    genExpansionContent (h) {
      return h('div', {
        class: 'v-row-expandable__expansion__content',
        key: this._uid
      }, this.$slots.expansion)
    },
    genExpandTransition (h) {
      const children = []

      if (this.isActive) {
        children.push(this.genExpansionContent(h))
      }

      const transition = h('transition-group', {
        class: 'v-row-expandable__expansion',
        props: {
          tag: 'div'
        },
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
      class: this.classes
    }, [
      this.genRow(h),
      this.genExpandTransition(h)
    ])
  }
}
