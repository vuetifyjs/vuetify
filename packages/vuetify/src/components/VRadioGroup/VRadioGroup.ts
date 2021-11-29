// Styles
import '../../styles/components/_selection-controls.sass'
import './VRadioGroup.sass'

// Extensions
import VInput from '../VInput'
import { BaseItemGroup } from '../VItemGroup/VItemGroup'

// Types
import mixins from '../../util/mixins'
import { PropType } from 'vue'

const baseMixins = mixins(
  BaseItemGroup,
  VInput
)

/* @vue/component */
export default baseMixins.extend({
  name: 'v-radio-group',

  provide () {
    return {
      radioGroup: this,
    }
  },

  props: {
    column: {
      type: Boolean,
      default: true,
    },
    height: {
      type: [Number, String],
      default: 'auto',
    },
    name: String,
    row: Boolean,
    // If no value set on VRadio
    // will match valueComparator
    // force default to null
    value: null as unknown as PropType<any>,
  },

  computed: {
    classes (): object {
      return {
        ...VInput.options.computed.classes.call(this),
        'v-input--selection-controls v-input--radio-group': true,
        'v-input--radio-group--column': this.column && !this.row,
        'v-input--radio-group--row': this.row,
      }
    },
  },

  methods: {
    genDefaultSlot () {
      return this.$createElement('div', {
        staticClass: 'v-input--radio-group__input',
        attrs: {
          id: this.id,
          role: 'radiogroup',
          'aria-labelledby': this.computedId,
        },
      }, VInput.options.methods.genDefaultSlot.call(this))
    },
    genInputSlot () {
      const render = VInput.options.methods.genInputSlot.call(this)

      delete render.data!.on!.click

      return render
    },
    genLabel () {
      const label = VInput.options.methods.genLabel.call(this)

      if (!label) return null

      label.data!.attrs!.id = this.computedId
      // WAI considers this an orphaned label
      delete label.data!.attrs!.for
      label.tag = 'legend'

      return label
    },
    onClick: BaseItemGroup.options.methods.onClick,
  },

  render (h) {
    const vnode = VInput.options.render.call(this, h)

    this._b(vnode.data!, 'div', this.attrs$)

    return vnode
  },
})
