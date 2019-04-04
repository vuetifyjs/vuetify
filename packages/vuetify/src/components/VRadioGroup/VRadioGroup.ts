// Styles
import '../../styles/components/_selection-controls.sass'
import './VRadioGroup.sass'

// Extensions
import VInput from '../VInput'
import { BaseItemGroup } from '../VItemGroup/VItemGroup'

// Mixins
import Comparable from '../../mixins/comparable'
import mixins from '../../util/mixins'

const baseMixins = mixins(
  Comparable,
  BaseItemGroup,
  VInput
)

/* @vue/component */
export default baseMixins.extend({
  name: 'v-radio-group',

  provide () {
    return {
      radioGroup: this
    }
  },

  props: {
    column: {
      type: Boolean,
      default: true
    },
    height: {
      type: [Number, String],
      default: 'auto'
    },
    name: String,
    row: Boolean,
    // If no value set on VRadio
    // will match valueComparator
    // force default to null
    value: {
      default: null
    }
  },

  computed: {
    classes (): object {
      return {
        'v-input--selection-controls v-input--radio-group': true,
        'v-input--radio-group--column': this.column && !this.row,
        'v-input--radio-group--row': this.row
      }
    }
  },

  methods: {
    genDefaultSlot () {
      return this.$createElement('div', {
        staticClass: 'v-input--radio-group__input',
        attrs: {
          role: 'radiogroup'
        }
      }, VInput.options.methods.genDefaultSlot.call(this))
    },
    genInputSlot () {
      const render = VInput.options.methods.genInputSlot.call(this)

      delete render.data!.on!.click

      return render
    },
    onClick (item: any) {
      BaseItemGroup.options.methods.onClick.call(this, item)
    }
  }
})
