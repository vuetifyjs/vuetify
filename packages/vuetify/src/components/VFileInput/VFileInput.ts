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

  props: {
    accept: {
      type: String,
      default: null,
    } as PropValidator<string | null>,
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
    fileValue: {
      type: [Object, Array],
      default: () => ([]),
    } as PropValidator<File | File[]>,
    progress: {
      type: [Number, String],
      default: null,
      validator: (v: number | string) => !isNaN(parseInt(v)),
    } as PropValidator<number | string | null>,
    counterString: {
      type: String,
      default: '$vuetify.fileInput.counter',
    },
    counterSizeString: {
      type: String,
      default: '$vuetify.fileInput.counterSize',
    },
    displaySize: {
      type: [Boolean, Number],
      default: false,
      validator: v => typeof v === 'boolean' || v === 1000 || v === 1024,
    } as PropValidator<boolean | 1000 | 1024>,
    chips: Boolean,
    removable: {
      type: Boolean,
      default: true,
    },
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
    counterValue (): string {
      if (this.displaySize) {
        const bytes = this.lazyFileValue.length > 0 ? (this.lazyFileValue as File[]).map(f => f.size).reduce((a, b) => a + b) : 0
        return this.$vuetify.lang.t(this.counterSizeString, this.lazyFileValue.length, humanReadableFileSize(bytes, this.base))
      }
      return this.$vuetify.lang.t(this.counterString, this.lazyFileValue.length)
    },
    isDirty (): boolean {
      return this.lazyFileValue.length > 0
    },
    text (): string[] {
      if (!this.isDirty) return [ this.placeholder ]

      return this.lazyFileValue.map(file =>
        this.displaySize ? `${file.name} (${humanReadableFileSize(file.size, this.base)})` : file.name
      )
    },
    base (): 1000 | 1024 | undefined {
      return typeof this.displaySize !== 'boolean' ? this.displaySize : undefined
    },
  },

  watch: {
    lazyFileValue () {
      this.$emit('update:fileValue', this.lazyFileValue)
    },
    fileValue () {
      this.lazyFileValue = wrapInArray(this.fileValue)
      this.internalValue = null // No way to "push" update from JS to file input
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
      input.data!.attrs!.accept = this.accept
      input.data!.on!.change = (e: any) => {
        /* istanbul ignore next */
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
      }, this.$scopedSlots.selection ? this.$scopedSlots.selection({ text: this.text, files: this.lazyFileValue }) : this.chips ? this.genChips() : [this.text.join(', ')])
    },
    genChips () {
      return this.isDirty
        ? this.text.map((text, i) => this.$createElement(VChip, {
          props: {
            close: this.removable,
          },
          on: {
            'click:close': () => {
              this.removable && this.lazyFileValue.splice(i, 1)
            },
          },
        }, [text]))
        : []
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
  },
})
