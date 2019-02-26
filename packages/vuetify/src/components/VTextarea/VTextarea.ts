// Styles
import '../../stylus/components/_textarea.styl'

// Extensions
import VTextField from '../VTextField/VTextField'

// Utilities
import mixins, { ExtractVue } from './../../util/mixins'
import { consoleInfo } from '../../util/console'

// Types
import Vue from 'vue'

interface options extends Vue {
  $refs: {
    input: HTMLTextAreaElement
  }
}

/* @vue/component */
export default mixins<options &
/* eslint-disable indent */
  ExtractVue<typeof VTextField>
/* eslint-enable indent */
>(
  VTextField
).extend({
  name: 'v-textarea',

  props: {
    autoGrow: Boolean,
    noResize: Boolean,
    outline: Boolean,
    rowHeight: {
      type: [Number, String],
      default: 24,
      validator: (v: any) => !isNaN(parseFloat(v))
    },
    rows: {
      type: [Number, String],
      default: 5,
      validator: (v: any) => !isNaN(parseInt(v, 10))
    }
  },

  computed: {
    classes (): object {
      return {
        'v-textarea': true,
        'v-textarea--auto-grow': this.autoGrow,
        'v-textarea--no-resize': this.noResizeHandle,
        ...VTextField.options.computed.classes.call(this)
      }
    },
    noResizeHandle (): boolean {
      return this.noResize || this.autoGrow
    }
  },

  watch: {
    lazyValue () {
      !this.internalChange && this.autoGrow && this.$nextTick(this.calculateInputHeight)
    }
  },

  mounted () {
    setTimeout(() => {
      this.autoGrow && this.calculateInputHeight()
    }, 0)

    // TODO: remove (2.0)
    if (this.autoGrow && this.noResize) {
      consoleInfo('"no-resize" is now implied when using "auto-grow", and can be removed', this)
    }
  },

  methods: {
    calculateInputHeight () {
      const input = this.$refs.input

      if (input) {
        input.style.height = '0'
        const height = input.scrollHeight
        const minHeight = parseInt(this.rows, 10) * parseFloat(this.rowHeight)
        // This has to be done ASAP, waiting for Vue
        // to update the DOM causes ugly layout jumping
        input.style.height = Math.max(minHeight, height) + 'px'
      }
    },
    genInput () {
      const input = VTextField.options.methods.genInput.call(this)

      input.tag = 'textarea'
      delete input.data!.attrs!.type
      input.data!.attrs!.rows = this.rows

      return input
    },
    onInput (e: Event) {
      VTextField.options.methods.onInput.call(this, e)
      this.autoGrow && this.calculateInputHeight()
    },
    onKeyDown (e: KeyboardEvent) {
      // Prevents closing of a
      // dialog when pressing
      // enter
      if (this.isFocused &&
        e.keyCode === 13
      ) {
        e.stopPropagation()
      }

      this.internalChange = true
      this.$emit('keydown', e)
    }
  }
})
