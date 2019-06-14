import VInput from '../VInput'
import mixins, { ExtractVue } from '../../util/mixins'

interface options extends ExtractVue<typeof VInput> {
  $refs: {
    input: HTMLInputElement
  }
}

export default mixins<options>(VInput).extend({
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

  computed: {
    text (): string | null {
      if (!this.lazyValue || !this.lazyValue.length) return this.placeholder

      // TODO: use $t for X selected
      return this.lazyValue.length > 1 ? `${this.lazyValue.length} files selected` : this.lazyValue[0].name
    },
  },

  methods: {
    genDefaultSlot () {
      return [
        this.genLabel(),
        this.genInput(),
        this.genText(),
      ]
    },
    genPrependSlot () {
      const icon = this.genIcon('prepend', () => {
        this.$refs.input.click()
      })

      if (icon.data!.attrs) {
        icon.data!.attrs.tabindex = 0
      } else {
        icon.data!.attrs = { tabindex: 0 }
      }

      return this.genSlot('prepend', 'outer', [icon])
    },
    genAppendSlot () {
      const slot = []

      // Append icon for text field was really
      // an appended inner icon, v-text-field
      // will overwrite this method in order to obtain
      // backwards compat
      if (this.$slots.append) {
        slot.push(this.$slots.append)
      } else if (this.clearable && this.appendIcon) {
        slot.push(this.genIcon('append', () => {
          this.lazyValue = null
          this.$refs.input.value = ''
        }))
      }

      return this.genSlot('append', 'outer', slot)
    },
    genInput () {
      return this.$createElement('input', {
        ref: 'input',
        attrs: {
          'aria-label': !this.id && this.label, // Label `for` will be set if we have an id
          ...this.$attrs,
          disabled: this.disabled,
          placeholder: this.placeholder,
          readonly: this.readonly,
          id: this.id,
          hidden: true,
          type: 'file',
          multiple: this.multiple,
        },
        on: {
          change: (e: any) => {
            this.lazyValue = [...e.target.files]
          },
        },
      })
    },
    genText () {
      return this.$createElement('div', [this.text])
    },
  },
})
