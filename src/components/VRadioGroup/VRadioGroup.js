// Styles
import '../../stylus/components/_input-groups.styl'
import '../../stylus/components/_selection-controls.styl'
import '../../stylus/components/_radio-group.styl'

// Mixins
import Input from '../../mixins/input'
import {
  provide as RegistrableProvide
} from '../../mixins/registrable'

export default {
  name: 'v-radio-group',

  mixins: [
    Input,
    RegistrableProvide('radio')
  ],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  provide () {
    return {
      isMandatory: () => this.mandatory,
      name: () => this.name
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
    inputValue: null,
    mandatory: {
      type: Boolean,
      default: true
    },
    name: String,
    row: Boolean
  },

  watch: {
    hasError (val) {
      for (let index = this.radios.length; --index >= 0;) {
        this.radios[index].parentError = val
      }
    },
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
        'radio-group': true,
        'radio-group--column': this.column && !this.row,
        'radio-group--row': this.row,
        'error--text': this.hasError
      }
    }
  },

  methods: {
    toggleRadio (value) {
      if (this.disabled) {
        return
      }

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
    unregister (radio) {
      radio.$off('change', this.toggleRadio)
      radio.$off('blur', this.radioBlur)
      radio.$off('focus', this.radioFocus)

      const index = this.radios.findIndex(r => r === radio)

      if (index > -1) this.radios.splice(index, 1)
    }
  },

  render (h) {
    const data = {
      attrs: {
        role: 'radiogroup'
      }
    }
    return this.genInputGroup(this.$slots.default, data)
  }
}
