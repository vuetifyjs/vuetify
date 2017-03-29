export default {
  name: 'small-dialog',

  data () {
    return {
      isActive: false
    }
  },

  props: {
    large: Boolean
  },

  render (h) {
    return h('v-menu', {
      'class': 'small-dialog',
      props: {
        transition: 'v-slide-x-reverse-transition',
        origin: 'top right',
        right: true,
        nudgeWidth: 300,
        activator: this.$refs.activator,
        value: this.isActive
      },
      on: {
        input: val => (this.isActive = val)
      }
    }, [
      h('a', {
        domProps: { href: 'javascript:;' },
        slot: 'activator',
        ref: 'activator'
      }, [this.$slots.default]),
      h('div', {
        'class': 'small-dialog__content'
      }, [this.$slots.input]),
      h('div', {
        'class': 'small-dialog__actions'
      }, [this.$slots.actions])
    ])
  }
}
