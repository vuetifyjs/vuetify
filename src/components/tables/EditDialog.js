export default {
  name: 'edit-dialog',

  data () {
    return {
      isActive: false,
      isSaving: false,
      isInvalid: false
    }
  },

  props: {
    cancelText: {
      default: 'Cancel'
    },
    large: Boolean,
    lazy: Boolean,
    saveText: {
      default: 'Save'
    },
    transition: {
      type: String,
      default: 'v-slide-x-reverse-transition'
    },
    validate: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    isActive (val) {
      val && this.$emit('open') && this.$nextTick(this.focus)
      if (!val) {
        !this.isSaving && this.$emit('cancel')
        this.isSaving && this.$emit('close')
        this.isSaving = false
      }
    }
  },

  computed: {
    input () {
      return this.$slots.input.map(e => e.componentInstance).find(c => 'errors' in c)
    }
  },

  methods: {
    cancel () {
      this.isActive = false
    },
    focus () {
      const input = this.$el.querySelector('input')
      input && setTimeout(() => (input.focus()), 0)
    },
    save () {
      if (this.validate && this.input && this.input.errors.length > 0) {
        this.isInvalid = true
        return
      }

      this.isSaving = true
      this.isActive = false
      this.$emit('save')
    },
    genButton (fn, text) {
      return this.$createElement('v-btn', {
        props: {
          flat: true,
          primary: true,
          light: true
        },
        nativeOn: { click: fn }
      }, text)
    },
    genActions () {
      return this.$createElement('div', {
        'class': 'small-dialog__actions',
        directives: [{
          name: 'show',
          value: this.large
        }]
      }, [
        this.genButton(this.cancel, this.cancelText),
        this.genButton(this.save, this.saveText)
      ])
    },
    genContent () {
      return this.$createElement('div', {
        'class': ['small-dialog__content', { 'shake-animation': this.isInvalid }],
        on: {
          keydown: e => {
            this.isInvalid = false
            e.keyCode === 27 && this.cancel()
            e.keyCode === 13 && this.save()
          }
        }
      }, [this.$slots.input])
    }
  },

  render (h) {
    return h('v-menu', {
      'class': 'small-dialog',
      props: {
        transition: this.transition,
        origin: 'top right',
        right: true,
        value: this.isActive,
        closeOnContentClick: false,
        lazy: this.lazy
      },
      on: {
        input: val => (this.isActive = val)
      }
    }, [
      h('a', {
        domProps: { href: 'javascript:;' },
        slot: 'activator'
      }, [this.$slots.default]),
      this.genContent(),
      this.genActions()
    ])
  }
}
