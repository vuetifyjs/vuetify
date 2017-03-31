export default {
  name: 'edit-dialog',

  data () {
    return {
      isActive: false,
      isSaving: false
    }
  },

  props: {
    cancelText: {
      default: 'Cancel'
    },
    large: Boolean,
    saveText: {
      default: 'Save'
    },
    transition: {
      type: String,
      default: 'v-slide-x-reverse-transition'
    }
  },

  watch: {
    isActive (val) {
      val && this.$emit('open') && this.focus()
      if (!val) {
        !this.isSaving && this.$emit('cancel')
        this.isSaving && this.$emit('close')
        this.isSaving = false
      }
    }
  },

  methods: {
    cancel () {
      this.isActive = false
    },
    focus () {
      this.input && setTimeout(() => (this.input.focus()), 0)
    },
    save () {
      this.isSaving = true
      this.isActive = false
      this.$emit('save')
    }
  },

  mounted () {
    this.input = this.$el.querySelector('input')
  },

  render (h) {
    return h('v-menu', {
      'class': 'small-dialog',
      props: {
        transition: this.transition,
        origin: 'top right',
        right: true,
        value: this.isActive,
        closeOnContentClick: false
      },
      on: {
        input: val => (this.isActive = val)
      }
    }, [
      h('a', {
        domProps: { href: 'javascript:;' },
        slot: 'activator'
      }, [this.$slots.default]),
      h('div', {
        'class': 'small-dialog__content',
        on: {
          keydown: e => {
            e.keyCode === 27 && this.cancel()
            e.keyCode === 13 && this.save()
          }
        }
      }, [this.$slots.input]),
      h('div', {
        'class': 'small-dialog__actions',
        directives: [{
          name: 'show',
          value: this.large
        }]
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
