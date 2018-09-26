// Extensions
import { Group } from '../components/VItemGroup/VItemGroup'

/* @vue/component */
export default Group.extend({
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
      return Group.options.computed.classes.call(this)
    }
  }
})
