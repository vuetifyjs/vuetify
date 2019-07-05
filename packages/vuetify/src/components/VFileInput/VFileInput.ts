// Styles
import './VFileInput.sass'

// Extensions
import VTextField from '../VTextField'

// Components
import { VProgressLinear } from '../VProgressLinear'
import { VChip } from '../VChip'

// Types
import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

// Helpers
import { wrapInArray, humanReadableFileSize } from '../../util/helpers'

export default VTextField.extend({
  name: 'v-file-input',

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    accept: {
      type: String,
      default: null,
    } as PropValidator<string | null>,
    chips: Boolean,
    clearable: {
      type: Boolean,
      default: true,
    },
    counterSizeString: {
      type: String,
      default: '$vuetify.fileInput.counterSize',
    },
    counterString: {
      type: String,
      default: '$vuetify.fileInput.counter',
    },
    deletableChips: {
      type: Boolean,
      default: true,
    },
    displaySize: {
      type: [Boolean, Number],
      default: false,
      validator: v => typeof v === 'boolean' || v === 1000 || v === 1024,
    } as PropValidator<boolean | 1000 | 1024>,
    multiple: Boolean,
    placeholder: String,
    prependIcon: {
      type: String,
      default: '$vuetify.icons.file',
    },
    progress: {
      type: [Number, String],
      default: null,
      validator: (v: number | string) => !isNaN(parseInt(v)),
    } as PropValidator<number | string | null>,
    readonly: {
      type: Boolean,
      default: true,
    },
    smallChips: Boolean,
    type: {
      type: String,
      default: 'file',
    },
    value: {
      type: [Object, Array],
      default: () => ([]),
    } as PropValidator<File | File[]>,
  },

  data () {
    return {
      lazyValue: wrapInArray(this.value) as File[],
    }
  },

  computed: {
    classes (): object {
      return {
        ...VTextField.options.computed.classes.call(this),
        'v-file-input': true,
      }
    },
    counterValue (): string {
      if (this.displaySize) {
        const bytes = this.internalValue.length > 0
          ? (this.internalValue as File[]).map(f => f.size).reduce((a, b) => a + b)
          : 0

        return this.$vuetify.lang.t(this.counterSizeString, this.lazyValue.length, humanReadableFileSize(bytes, this.base))
      }
      return this.$vuetify.lang.t(this.counterString, this.lazyValue.length)
    },
    internalValue: {
      get (): File[] {
        return this.lazyValue
      },
      set (val: any) {
        this.lazyValue = wrapInArray(val)
        this.$emit('change', this.lazyValue)
      },
    },
    isDirty (): boolean {
      return this.internalValue.length > 0
    },
    isLabelActive (): boolean {
      return this.isDirty
    },
    text (): string[] {
      if (!this.isDirty) return [this.placeholder]

      return this.internalValue.map((file: File) =>
        this.displaySize ? `${file.name} (${humanReadableFileSize(file.size, this.base)})` : file.name
      )
    },
    base (): 1000 | 1024 | undefined {
      return typeof this.displaySize !== 'boolean' ? this.displaySize : undefined
    },
    hasChips (): boolean {
      return this.chips || this.smallChips
    },
  },

  methods: {
    clearableCallback () {
      this.internalValue = []
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
      input.data!.attrs!.accept = this.accept
      delete input.data!.domProps!.value

      return [
        this.genText(),
        input,
      ]
    },
    genText () {
      const children = this.$scopedSlots.selection
        ? this.$scopedSlots.selection({ text: this.text, files: this.internalValue })
        : this.hasChips && this.isDirty ? this.genChips() : [this.text.join(', ')]

      return this.$createElement('div', {
        staticClass: 'v-file-input__text',
        class: {
          'v-file-input__text--placeholder': this.placeholder && !this.isDirty,
          'v-file-input__text--chips': this.hasChips && !this.$scopedSlots.selection,
        },
        on: {
          click: () => {
            this.$refs.input.click()
          },
        },
      }, children)
    },
    genChips () {
      if (!this.isDirty) return []

      return this.text.map((text, i) => this.$createElement(VChip, {
        props: {
          close: this.deletableChips,
          small: this.smallChips,
        },
        on: {
          'click:close': () => {
            this.internalValue = this.internalValue.filter((val: File[], index: number) => {
              return i !== index
            })
          },
        },
      }, [text]))
    },
    genProgress (): VNode | VNode[] | null {
      if (this.loading === false && !this.progress) return null

      return this.$slots.progress || this.$createElement(VProgressLinear, {
        props: {
          absolute: true,
          color: (this.loading === true)
            ? (this.color || 'primary')
            : (this.loading || 'primary'),
          height: this.loaderHeight,
          indeterminate: !this.progress,
          value: this.progress || 0,
        },
      })
    },
    onInput (e: Event) {
      const target = e.target as HTMLInputElement
      this.internalValue = [...target.files]
    },
  },
})
