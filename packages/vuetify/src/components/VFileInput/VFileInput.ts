// Styles
import './VFileInput.sass'

// Extensions
import VTextField from '../VTextField'

export default VTextField.extend({
  name: 'v-file-input',

  props: {
    clearable: {
      type: Boolean,
      default: true,
    },
    multiple: Boolean,
    prependIcon: {
      type: String,
      default: '$vuetify.icons.file',
    },
    placeholder: String,
    readonly: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'file',
    },
  },

  data: () => ({
    lazyFileValue: [] as File[],
  }),

  computed: {
    classes (): object {
      return {
        ...VTextField.options.computed.classes.call(this),
        'v-file-input': true,
      }
    },
    counterValue (): string {
      // TODO: add to locale
      return `${this.lazyFileValue.length} files`
    },
    isDirty (): boolean {
      return this.lazyFileValue.length > 0
    },
    text (): string | null {
      if (!this.isDirty) return this.placeholder

      return this.lazyFileValue.map(file => file.name).join(', ')
    },
  },

  methods: {
    clearableCallback () {
      this.lazyFileValue = []
      this.internalValue = null
    },
    genPrependSlot () {
      const icon = this.genIcon('prepend', () => {
        this.$refs.input.click()
      })

      icon.data!.attrs! = { tabindex: 0 }

      return this.genSlot('prepend', 'outer', [icon])
    },
    genInput () {
      const input = VTextField.options.methods.genInput.call(this)

      input.data!.attrs!.multiple = this.multiple
      input.data!.on!.change = (e: any) => {
        this.lazyFileValue = e.target.files
      }

      return [
        this.genText(),
        input,
      ]
    },
    genText () {
      return this.$createElement('div', {
        staticClass: 'v-file-input__text',
        class: {
          'v-file-input__text--placeholder': this.placeholder && !this.isDirty,
        },
        on: {
          click: () => {
            this.$refs.input.click()
          },
        },
      }, [this.text])
    },
  },
})
