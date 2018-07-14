import '../../stylus/components/_file-uploads.styl'
import VTextField from '../VTextField/VTextField'
import { VBtn } from '../VBtn'
import { VProgressLinear } from '../VProgressLinear'

export default {
  name: 'VFileUpload',

  extends: VTextField,

  props: {
    readonly: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    files: []
  }),

  computed: {
    classes () {
      return Object.assign(
        {},
        VTextField.computed.classes.call(this),
        { 'v-file-upload': true }
      )
    },
    isLabelActive () {
      return this.isDirty
    }
  },

  methods: {
    clearableCallback () {
      this.internalValue = null
      this.$refs.input.value = null
      this.onChange()
    },
    genFiles () {
      return this.files.map(file =>
        this.$createElement('div', {
          staticClass: 'v-file-upload__selection'
        }, file.name)
      )
    },
    genInput () {
      const input = VTextField.methods.genInput.call(this)

      input.data.attrs.type = 'file'
      input.data.on.change = this.onChange

      return [
        input,
        this.genFiles()
      ]
    },
    genAppendSlot () {
      return this.$createElement(VBtn, {
        props: {
          color: this.color
        },
        on: {
          click: this.onClick
        }
      }, 'Click to Upload')
    },
    genProgress () {
      return this.$slots.progress || this.$createElement(VProgressLinear, {
        props: {
          active: false,
          color: 'primary',
          height: 2
        }
      })
    },
    onChange (e) {
      this.$emit('')
      this.setFiles()
    },
    onClick (e) {
      if (e.target !== this.$refs.input) {
        this.$refs.input.click()
      }
    },
    onFocus (e) {
      //
    },
    onMouseUp (e) {
      //
    },
    setFiles () {
      this.files = Array.from(this.$refs.input.files)
    }
  }
}
