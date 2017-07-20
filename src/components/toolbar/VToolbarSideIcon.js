import Themeable from '~mixins/themeable'

export default {
  name: 'v-toolbar-side-icon',

  mixins: [Themeable],

  mounted () {
    this.$el.addEventListener('click', this.onClick, false)
  },

  beforeDestroy () {
    this.$el && 
      this.$el.removeEventListener('click', this.onClick, false)
  },

  methods: {
    onClick: e => e.stopPropagation()
  },

  render (h) {
    const data = {
      staticClass: 'toolbar__side-icon',
      props: Object.assign({}, {
        icon: true
      }, this.$props),
      on: this.$listeners
    }

    return h('v-btn', data, [h('v-icon', 'menu')])
  }
}
