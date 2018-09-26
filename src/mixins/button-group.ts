// Extensions
import { ItemGroupInstance } from '../components/VItemGroup/VItemGroup'

/* @vue/component */
export default ItemGroupInstance.extend({
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
      return ItemGroupInstance.options.computed.classes.call(this)
    }
  }
})
