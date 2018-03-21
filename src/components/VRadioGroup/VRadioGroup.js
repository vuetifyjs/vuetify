// Styles
import '../../stylus/components/_input-groups.styl'
import '../../stylus/components/_selection-controls.styl'
import '../../stylus/components/_radio-group.styl'

// Components
import VInput from '../VInput'

// Mixins
import {
  provide as RegistrableProvide
} from '../../mixins/registrable'

export default {
  name: 'v-radio-group',

  extends: VInput,

  mixins: [
    RegistrableProvide('radio')
  ],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  provide () {
    return {
      isMandatory: () => this.mandatory,
      name: () => this.name,
      validationState: () => this.validationState
    }
  },

  data: () => ({
    internalTabIndex: -1,
    radios: []
  }),

  props: {
    column: {
      type: Boolean,
      default: true
    },
    height: {
      type: [Number, String],
      default: 'auto'
    },
    inputValue: null,
    mandatory: {
      type: Boolean,
      default: true
    },
    name: String,
    row: Boolean
  },

  watch: {
    hasError: 'setErrorState',
    inputValue (val) {
      for (let index = this.radios.length; --index >= 0;) {
        const radio = this.radios[index]
        radio.isActive = val === radio.value
      }
    }
  },

  computed: {
    classes () {
      return {
        'v-input--selection-controls v-input--radio-group': true,
        'v-input--radio-group--column': this.column && !this.row,
        'v-input--radio-group--row': this.row
      }
    }
  },

  mounted () {
    this.setErrorState(this.hasError)
  },

  methods: {
    genDefaultSlot () {
      return [this.genRadioGroup()]
    },
    genRadioGroup () {
      return this.$createElement('div', {
        staticClass: 'v-input--radio-group__input'
      }, this.$slots.default)
    },
    toggleRadio (value) {
      if (this.disabled) return

      this.shouldValidate = true
      this.$emit('change', value)
      this.$nextTick(() => this.validate())

      for (let index = this.radios.length; --index >= 0;) {
        const radio = this.radios[index]
        if (radio.value !== value) radio.isActive = false
      }
    },
    radioBlur (e) {
      if (!e.relatedTarget || !e.relatedTarget.classList.contains('radio')) {
        this.shouldValidate = true
        this.$emit('blur', this.inputValue)
      }
    },
    register (radio) {
      radio.isActive = this.inputValue === radio.value
      radio.$el.tabIndex = radio.$el.tabIndex > 0 ? radio.$el.tabIndex : 0
      radio.$on('change', this.toggleRadio)
      radio.$on('blur', this.radioBlur)
      radio.$on('focus', this.radioFocus)
      this.radios.push(radio)
    },
    setErrorState (val) {
      for (let index = this.radios.length; --index >= 0;) {
        this.radios[index].parentError = val
      }
    },
    unregister (radio) {
      radio.$off('change', this.toggleRadio)
      radio.$off('blur', this.radioBlur)
      radio.$off('focus', this.radioFocus)

      const index = this.radios.findIndex(r => r === radio)

      if (index > -1) this.radios.splice(index, 1)
    }
  }
}
