// Styles
import './VBtnToggle.sass'

// Mixins
import ButtonGroup from '../../mixins/button-group'

/* @vue/component */
export default ButtonGroup.extend({
  name: 'v-btn-toggle',

  props: {
    rounded: Boolean
  },

  computed: {
    classes (): object {
      return {
        ...ButtonGroup.options.computed.classes.call(this),
        'v-btn-toggle': true,
        'v-btn-toggle--rounded': this.rounded
      }
    }
  }
})
