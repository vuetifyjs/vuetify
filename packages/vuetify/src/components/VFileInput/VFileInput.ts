// Styles
import './VFileInput.sass'

// Extensions
import VTextField from '../VTextField'

// Components
import { VChip } from '../VChip'

// Types
import { PropValidator } from 'vue/types/options'

// Utilities
import { deepEqual, humanReadableFileSize, wrapInArray } from '../../util/helpers'
import { consoleError } from '../../util/console'
import { mergeStyles } from '../../util/mergeData'

export default VTextField.extend({
  name: 'v-file-input',

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
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
    hideInput: Boolean,
    multiple: Boolean,
    placeholder: String,
    prependIcon: {
      type: String,
      default: '$file',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    showSize: {
      type: [Boolean, Number],
      default: false,
      validator: (v: boolean | number) => {
        return (
          typeof v === 'boolean' ||
          [1000, 1024].includes(v)
        )
      },
    } as PropValidator<boolean | 1000 | 1024>,
    smallChips: Boolean,
    truncateLength: {
      type: [Number, String],
      default: 22,
    },
    type: {
      type: String,
      default: 'file',
    },
    value: {
      default: undefined,
      validator: val => {
        return wrapInArray(val).every(v => v != null && typeof v === 'object')
      },
    } as PropValidator<File | File[]>,
  },

  computed: {
    classes (): object {
      return {
        ...VTextField.options.computed.classes.call(this),
        'v-file-input': true,
      }
    },
    computedCounterValue (): string {
      const fileCount = (this.multiple && this.lazyValue)
        ? this.lazyValue.length
        : (this.lazyValue instanceof File) ? 1 : 0

      if (!this.showSize) return this.$vuetify.lang.t(this.counterString, fileCount)

      const bytes = this.internalArrayValue.reduce((bytes: number, { size = 0 }: File) => {
        return bytes + size
      }, 0)

      return this.$vuetify.lang.t(
        this.counterSizeString,
        fileCount,
        humanReadableFileSize(bytes, this.base === 1024)
      )
    },
    internalArrayValue (): File[] {
      return wrapInArray(this.internalValue)
    },
    internalValue: {
      get (): File[] {
        return this.lazyValue
      },
      set (val: File | File[]) {
        this.lazyValue = val
        this.$emit('change', this.lazyValue)
      },
    },
    isDirty (): boolean {
      return this.internalArrayValue.length > 0
    },
    isLabelActive (): boolean {
      return this.isDirty
    },
    text (): string[] {
      if (!this.isDirty && (this.isFocused || !this.hasLabel)) return [this.placeholder]

      return this.internalArrayValue.map((file: File) => {
        const {
          name = '',
          size = 0,
        } = file

        const truncatedText = this.truncateText(name)

        return !this.showSize
          ? truncatedText
          : `${truncatedText} (${humanReadableFileSize(size, this.base === 1024)})`
      })
    },
    base (): 1000 | 1024 | undefined {
      return typeof this.showSize !== 'boolean' ? this.showSize : undefined
    },
    hasChips (): boolean {
      return this.chips || this.smallChips
    },
  },

  watch: {
    readonly: {
      handler (v) {
        if (v === true) consoleError('readonly is not supported on <v-file-input>', this)
      },
      immediate: true,
    },
    value (v) {
      const value = this.multiple ? v : v ? [v] : []
      if (!deepEqual(value, this.$refs.input.files)) {
        // When the input value is changed programatically, clear the
        // internal input's value so that the `onInput` handler
        // can be triggered again if the user re-selects the exact
        // same file(s). Ideally, `input.files` should be
        // manipulated directly but that property is readonly.
        this.$refs.input.value = ''
      }
    },
  },

  methods: {
    clearableCallback () {
      this.internalValue = this.multiple ? [] : null
      this.$refs.input.value = ''
    },
    genChips () {
      if (!this.isDirty) return []

      return this.text.map((text, index) => this.$createElement(VChip, {
        props: { small: this.smallChips },
        on: {
          'click:close': () => {
            const internalValue = this.internalValue
            internalValue.splice(index, 1)
            this.internalValue = internalValue // Trigger the watcher
          },
        },
      }, [text]))
    },
    genControl () {
      const render = VTextField.options.methods.genControl.call(this)

      if (this.hideInput) {
        render.data!.style = mergeStyles(
          render.data!.style,
          { display: 'none' }
        )
      }

      return render
    },
    genInput () {
      const input = VTextField.options.methods.genInput.call(this)

      input.data!.attrs!.multiple = this.multiple

      // We should not be setting value
      // programmatically on the input
      // when it is using type="file"
      delete input.data!.domProps!.value

      // This solves an issue in Safari where
      // nothing happens when adding a file
      // do to the input event not firing
      // https://github.com/vuetifyjs/vuetify/issues/7941
      delete input.data!.on!.input
      input.data!.on!.change = this.onInput

      return [this.genSelections(), input]
    },
    genPrependSlot () {
      if (!this.prependIcon) return null

      const icon = this.genIcon('prepend', () => {
        this.$refs.input.click()
      })

      return this.genSlot('prepend', 'outer', [icon])
    },
    genSelectionText (): string[] {
      const length = this.text.length

      if (length < 2) return this.text
      if (this.showSize && !this.counter) return [this.computedCounterValue]
      return [this.$vuetify.lang.t(this.counterString, length)]
    },
    genSelections () {
      const children = []

      if (this.isDirty && this.$scopedSlots.selection) {
        this.internalArrayValue.forEach((file: File, index: number) => {
          if (!this.$scopedSlots.selection) return

          children.push(
            this.$scopedSlots.selection({
              text: this.text[index],
              file,
              index,
            })
          )
        })
      } else {
        children.push(this.hasChips && this.isDirty ? this.genChips() : this.genSelectionText())
      }

      return this.$createElement('div', {
        staticClass: 'v-file-input__text',
        class: {
          'v-file-input__text--placeholder': this.placeholder && !this.isDirty,
          'v-file-input__text--chips': this.hasChips && !this.$scopedSlots.selection,
        },
      }, children)
    },
    genTextFieldSlot () {
      const node = VTextField.options.methods.genTextFieldSlot.call(this)

      node.data!.on = {
        ...(node.data!.on || {}),
        click: () => this.$refs.input.click(),
      }

      return node
    },
    onInput (e: Event) {
      const files = [...(e.target as HTMLInputElement).files || []]

      this.internalValue = this.multiple ? files : files[0]

      // Set initialValue here otherwise isFocused
      // watcher in VTextField will emit a change
      // event whenever the component is blurred
      this.initialValue = this.internalValue
    },
    onKeyDown (e: KeyboardEvent) {
      this.$emit('keydown', e)
    },
    truncateText (str: string) {
      if (str.length < Number(this.truncateLength)) return str
      const charsKeepOneSide = Math.floor((Number(this.truncateLength) - 1) / 2)
      return `${str.slice(0, charsKeepOneSide)}…${str.slice(str.length - charsKeepOneSide)}`
    },
  },
})
