// Styles
import '../../stylus/components/_overflow-buttons.styl'

// Extensions
// import VSelect from '../VSelect/VSelect'
import VAutocomplete from '../VAutocomplete'
import VTextField from '../VTextField/VTextField'

/* eslint-disable */
import VBtn from '../VBtn'

export default {
  name: 'v-overflow-btn',

  extends: VAutocomplete,

  props: {
    segmented: Boolean,
    editable: Boolean
  },

  computed: {
    classes () {
      return Object.assign(VAutocomplete.computed.classes.call(this), {
        'v-overflow-btn': true,
        'v-overflow-btn--segmented': this.segmented
      })
    },
    isAnyValueAllowed () {
      return this.editable || VAutocomplete.computed.isAnyValueAllowed.call(this)
    },
    isSingle () {
      return true
    }
  },

  methods: {
    genInput () {
      const input = VTextField.methods.genInput.call(this)

      input.data.domProps.value = this.internalSearch
      input.data.attrs.disabled = !this.isAnyValueAllowed

      return input
    },
    genLabel () {
      const label = VTextField.methods.genLabel.call(this)

      delete label.data.style.position

      return label
    }
  }
}
