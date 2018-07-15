// Styles
import '../../stylus/components/_file-uploads.styl'

// Components
import VProgressLinear from '../VProgressLinear'
import VTextField from '../VTextField/VTextField'

// Mixins
import Uploadable from '../../mixins/uploadable'

export default {
  name: 'VFileUpload',

  extends: VTextField,

  mixins: [Uploadable],

  props: {
    appendIcon: {
      type: String,
      default: '$vuetify.icons.file'
    },
    readonly: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    //
  }),

  computed: {
    classes () {
      return {
        'v-file-upload': true,
        ...VTextField.computed.classes.call(this)
      }
    },
    isLabelActive () {
      return this.isDirty
    },
    shouldShowProgress () {
      return this.loading || this.isUploading || this.uploadProgress > 0
    }
  },

  methods: {
    clearableCallback () {
      this.internalValue = null
      this.$refs.input.value = null
      this.onChange()
    },
    genFiles () {
      return this.internalFiles.map(file =>
        this.$createElement('div', {
          staticClass: 'v-file-upload__selection'
        }, file.name)
      )
    },
    genInput () {
      const input = VTextField.methods.genInput.call(this)

      input.data.attrs.type = 'file'
      input.data.on.change = this.onFileChange

      return [
        input,
        this.genFiles()
      ]
    },
    genProgress () {
      if (!this.shouldShowProgress) return null

      return this.$slots.progress || this.$createElement(VProgressLinear, {
        props: {
          active: this.isUploading,
          color: this.color,
          height: 2,
          value: this.uploadProgress
        }
      })
    },
    genIconSlot () {
      const slot = []

      if (this.$slots['append']) {
        slot.push(this.$slots['append'])
      } else if (this.appendIcon) {
        slot.push(this.genIcon('append', this.onClick, false))
      }

      return this.genSlot('append', 'inner', slot)
    },
    getInput () {
      return this.$refs.input
    },
    onClick (e) {
      this.openFiles(e)
    },
    onFocus () { /* */ },
    onMouseUp () { /* */ }
  }
}
