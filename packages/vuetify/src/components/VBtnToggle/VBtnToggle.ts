// Styles
import '../../stylus/components/_button-toggle.styl'

// Mixins
import ButtonGroup from '../../mixins/button-group'

/* @vue/component */
export default ButtonGroup.extend({
  name: 'v-btn-toggle',

  props: {
    activeClass: {
      type: String,
      default: 'v-btn--active'
    }
  },

  computed: {
    classes (): object {
      return {
        ...ButtonGroup.options.computed.classes.call(this),
        'v-btn-toggle': true,
        'v-btn-toggle--only-child': this.selectedItems.length === 1,
        'v-btn-toggle--selected': this.selectedItems.length > 0
      }
    }
  }
})
