// Extensions
import { BaseSlideGroup } from '../VSlideGroup/VSlideGroup'

export default BaseSlideGroup.extend({
  name: 'v-tabs-bar',

  provide () {
    return {
      tabsBar: this
    }
  },

  computed: {
    classes () {
      return {
        ...BaseSlideGroup.options.computed.classes.call(this),
        'v-tabs__bar': true
      }
    }
  }
})
