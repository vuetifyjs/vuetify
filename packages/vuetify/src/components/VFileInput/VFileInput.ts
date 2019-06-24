// Styles
import './VFileInput.sass'

// Extensions
import VTextField from '../VTextField'

export default VTextField.extend({
  name: 'v-file-input',

  props: {
    clearable: Boolean,
    multiple: Boolean,
    prependIcon: {
      type: String,
      default: '$vuetify.icons.file',
    },
    appendIcon: {
      type: String,
      default: '$vuetify.icons.close',
    },
    placeholder: String,
  },

  data: () => ({
    lazyFileValue: [] as any[],
  }),

  computed: {
    classes (): object {
      return {
        ...VTextField.options.computed.classes.call(this),
        'v-file-input': true,
      }
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
    genIconSlot () {
      const slot = []

      if (this.isDirty) {
        slot.push(this.genIcon('append', () => {
          this.lazyFileValue = []
          this.internalValue = null
        }))
      }

      return this.genSlot('append', 'inner', slot)
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

      input.data!.domProps!.type = 'file'
      input.data!.attrs!.multiple = this.multiple
      input.data!.attrs!.readonly = true
      input.data!.attrs!['aria-readonly'] = String(this.readonly)
      input.data!.on!.change = (e: any) => {
        this.lazyFileValue = [...e.target.files]
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
