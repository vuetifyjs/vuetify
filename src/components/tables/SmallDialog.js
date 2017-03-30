export default {
  name: 'small-dialog',

  data () {
    return {
      isActive: false
    }
  },

  props: {
    cancelText: {
      default: 'Cancel'
    },
    large: Boolean,
    saveText: {
      default: 'Save'
    }
  },

  watch: {
    isActive (val) {
      val && this.$emit('open') || !val && this.$emit('close')
    }
  },

  methods: {
    cancel () {
      this.isActive = false
      this.$emit('cancel')
    },
    save () {
      this.isActive = false
      this.$emit('save')
    }
  },

  render (h) {
    return h('v-menu', {
      'class': 'small-dialog',
      props: {
        transition: 'v-slide-x-reverse-transition',
        origin: 'top right',
        right: true,
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
      }, [
        h('v-btn', {
          props: {
            flat: true,
            primary: true,
            light: true
          },
          nativeOn: { click: this.cancel }
        }, this.cancelText),
        h('v-btn', {
          props: {
            flat: true,
            primary: true,
            light: true
          },
          nativeOn: { click: this.save }
        }, this.saveText)
      ])
    ])
  }
}
