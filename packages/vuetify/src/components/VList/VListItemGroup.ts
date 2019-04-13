// Extensions
import { BaseItemGroup } from '../VItemGroup/VItemGroup'

export default BaseItemGroup.extend({
  name: 'v-list-item-group',

  provide () {
    return {
      listItemGroup: this
    }
  },

  props: {
    activeClass: {
      type: String,
      default: 'primary--text'
    }
  }
})
