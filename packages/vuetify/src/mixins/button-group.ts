// Extensions
import { BaseItemGroup } from '../components/VItemGroup/VItemGroup'

/* @vue/component */
export default BaseItemGroup.extend({
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
      return BaseItemGroup.options.computed.classes.call(this)
    }
  }
})
