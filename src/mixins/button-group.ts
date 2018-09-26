// Extensions
import { VItemGroup } from '../components/VItemGroup'

/* @vue/component */
export default VItemGroup.extend({
  name: 'button-group',

  provide (): object {
    return {
      btnToggle: this
    }
  },

  props: {
    activeClass: {
      type: String,
      default: 'v-btn--active'
    }
  },

  computed: {
    classes (): object {
      return VItemGroup.options.computed.classes.call(this)
    }
  }
})
