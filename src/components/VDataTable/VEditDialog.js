import '../../stylus/components/_small-dialog.styl'

// Mixins
import Returnable from '../../mixins/returnable'
import Themeable from '../../mixins/themeable'

// Utils
import { keyCodes } from '../../util/helpers'

import VBtn from '../VBtn'
import VMenu from '../VMenu'

/* @vue/component */
export default {
  name: 'v-edit-dialog',

  mixins: [Returnable, Themeable],

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

  data () {
    return {
      isActive: false
    }
  },

  watch: {
    isActive (val) {
      if (val) {
        this.$emit('open')
        setTimeout(this.focus, 50) // Give DOM time to paint
      } else {
        this.$emit('close')
      }
    }
  },

  methods: {
    cancel () {
      this.isActive = false
      this.$emit('cancel')
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
        'class': 'v-small-dialog__actions'
      }, [
        this.genButton(this.cancel, this.cancelText),
        this.genButton(() => {
          this.save(this.returnValue)
          this.$emit('save')
        }, this.saveText)
      ])
    },
    genContent () {
      return this.$createElement('div', {
        on: {
          keydown: e => {
            const input = this.$refs.content.querySelector('input')
            e.keyCode === keyCodes.esc && this.cancel()
            if (e.keyCode === keyCodes.enter && input) {
              this.save(input.value)
              this.$emit('save')
            }
          }
        },
        ref: 'content'
      }, [this.$slots.input])
    }
  },

  render (h) {
    return h(VMenu, {
      staticClass: 'v-small-dialog',
      class: this.themeClasses,
      props: {
        contentClass: 'v-small-dialog__content',
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
