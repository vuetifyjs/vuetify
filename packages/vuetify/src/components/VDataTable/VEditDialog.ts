// Styles
import './VEditDialog.sass'

// Mixins
import Returnable from '../../mixins/returnable'
import Themeable from '../../mixins/themeable'

// Utils
import { keyCodes } from '../../util/helpers'

// Component
import VBtn from '../VBtn'
import VMenu from '../VMenu'

// Types
import { VNode, VNodeChildren } from 'vue'
import mixins from '../../util/mixins'

/* @vue/component */
export default mixins(Returnable, Themeable).extend({
  name: 'v-edit-dialog',

  props: {
    cancelText: {
      default: 'Cancel',
    },
    large: Boolean,
    eager: Boolean,
    persistent: Boolean,
    saveText: {
      default: 'Save',
    },
    transition: {
      type: String,
      default: 'slide-x-reverse-transition',
    },
  },

  data () {
    return {
      isActive: false,
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
    },
  },

  methods: {
    cancel () {
      this.isActive = false
      this.$emit('cancel')
    },
    focus () {
      const input = (this.$refs.content as Element).querySelector('input')
      input && input.focus()
    },
    genButton (fn: Function, text: VNodeChildren): VNode {
      return this.$createElement(VBtn, {
        props: {
          text: true,
          color: 'primary',
          light: true,
        },
        on: { click: fn },
      }, text)
    },
    genActions (): VNode {
      return this.$createElement('div', {
        class: 'v-small-dialog__actions',
      }, [
        this.genButton(this.cancel, this.cancelText),
        this.genButton(() => {
          this.save(this.returnValue)
          this.$emit('save')
        }, this.saveText),
      ])
    },
    genContent (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-small-dialog__content',
        on: {
          keydown: (e: KeyboardEvent) => {
            e.keyCode === keyCodes.esc && this.cancel()
            if (e.keyCode === keyCodes.enter) {
              this.save(this.returnValue)
              this.$emit('save')
            }
          },
        },
        ref: 'content',
      }, [this.$slots.input])
    },
  },

  render (h): VNode {
    return h(VMenu, {
      staticClass: 'v-small-dialog',
      class: this.themeClasses,
      props: {
        contentClass: 'v-small-dialog__menu-content',
        transition: this.transition,
        origin: 'top right',
        right: true,
        value: this.isActive,
        closeOnClick: !this.persistent,
        closeOnContentClick: false,
        eager: this.eager,
        light: this.light,
        dark: this.dark,
      },
      on: {
        input: (val: boolean) => (this.isActive = val),
      },
      scopedSlots: {
        activator: ({ on }) => {
          return h('div', {
            staticClass: 'v-small-dialog__activator',
            on,
          }, [
            h('span', {
              staticClass: 'v-small-dialog__activator__content',
            }, this.$slots.default),
          ])
        },
      },
    }, [
      this.genContent(),
      this.large ? this.genActions() : null,
    ])
  },
})
