// Styles
import './VFileInput.sass'

// Extensions
import VTextField from '../VTextField'

// Components
import { VProgressLinear } from '../VProgressLinear'
import { VChip } from '../VChip'

// Types
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
      type: [Number, Boolean],
      default: false,
      validator: (v: number | boolean) => typeof v === 'boolean' || v === 1000 || v === 1024,
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
      default: () => [],
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
      if (!this.displaySize) return this.$vuetify.lang.t(this.counterString, this.lazyValue.length)

      const bytes = this.internalValue.length > 0
        ? (this.internalValue as File[])
            .map(f => f.size)
            .reduce((a, b) => a + b)
        : 0

      return this.$vuetify.lang.t(
        this.counterSizeString,
        this.lazyValue.length,
        humanReadableFileSize(bytes, this.base)
      )
    },
    internalValue: {
      get (): File[] {
        return this.lazyValue
      },
      set (val: File | File[]) {
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
      if (!this.isDirty) return [ this.placeholder ]

      return this.internalValue.map((file: File) =>
        this.displaySize
          ? `${file.name} (${humanReadableFileSize(file.size, this.base)})`
          : file.name
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

      return this.genSlot('prepend', 'outer', [ icon ])
    },
    genInput () {
      const input = VTextField.options.methods.genInput.call(this)

      input.data!.attrs!.multiple = this.multiple
      input.data!.attrs!.accept = this.accept
      delete input.data!.domProps!.value

      return [ this.genText(), input ]
    },
    genText () {
      const children = this.$scopedSlots.selection
        ? this.$scopedSlots.selection({ text: this.text, files: this.internalValue })
        : this.hasChips && this.isDirty ? this.genChips() : [ this.text.join(', ') ]

      return this.$createElement('div', {
        staticClass: 'v-file-input__text',
        class: {
          'v-file-input__text--placeholder': this.placeholder && !this.isDirty,
          'v-file-input__text--chips': this.hasChips && !this.$scopedSlots.selection,
        },
        on: {
          click: () => this.$refs.input.click(),
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
            this.internalValue.splice(i, 1)
            this.internalValue = this.internalValue // Trigger the watcher
          },
        },
      }, [ text ]))
    },
    genProgress () {
      if (this.loading === false && !this.progress) return null

      return this.$slots.progress || this.$createElement(VProgressLinear, {
        props: {
          absolute: true,
          color: (this.loading === true ? this.color : this.loading) || 'primary',
          height: this.loaderHeight,
          indeterminate: !this.progress,
          value: this.progress,
        },
      })
    },
    onInput (e: Event) {
      this.internalValue = [...(e.target as HTMLInputElement).files]
    },
  },
})
