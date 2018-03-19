import '../../stylus/components/_small-dialog.styl'

// Mixins
import Returnable from '../../mixins/returnable'

import VBtn from '../VBtn'
import VMenu from '../VMenu'

export default {
  name: 'v-edit-dialog',

  mixins: [ Returnable ],

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
    lazy: Boolean,
    persistent: Boolean,
    saveText: {
      default: 'Save'
    },
    transition: {
      type: String,
      default: 'slide-x-reverse-transition'
    }
  },

  watch: {
    isActive (val) {
      val && setTimeout(this.focus, 50) // Give DOM time to paint
    }
  },

  methods: {
    cancel () {
      this.isActive = false
    },
    focus () {
      const input = this.$refs.content.querySelector('input')
      input && input.focus()
    },
    genButton (fn, text) {
      return this.$createElement(VBtn, {
        props: {
          flat: true,
          color: 'primary',
          light: true
        },
        on: { click: fn }
      }, text)
    },
    genActions () {
      return this.$createElement('div', {
        'class': 'small-dialog__actions'
      }, [
        this.genButton(this.cancel, this.cancelText),
        this.genButton(() => this.save(this.returnValue), this.saveText)
      ])
    },
    genContent () {
      return this.$createElement('div', {
        on: {
          keydown: e => {
            const input = this.$refs.content.querySelector('input')
            e.keyCode === 27 && this.cancel()
            e.keyCode === 13 && input && this.save(input.value)
          }
        },
        ref: 'content'
      }, [this.$slots.input])
    }
  },

  render (h) {
    return h(VMenu, {
      'class': 'small-dialog',
      props: {
        contentClass: 'small-dialog__content',
        transition: this.transition,
        origin: 'top right',
        right: true,
        value: this.isActive,
        closeOnClick: !this.persistent,
        closeOnContentClick: false,
        lazy: this.lazy
      },
      on: {
        input: val => (this.isActive = val)
      }
    }, [
      h('a', {
        slot: 'activator'
      }, this.$slots.default),
      this.genContent(),
      this.large ? this.genActions() : null
    ])
  }
}
