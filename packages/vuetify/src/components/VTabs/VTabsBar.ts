// Extensions
import { BaseSlideGroup } from '../VSlideGroup/VSlideGroup'

// Mixins
import Themeable from '../../mixins/themeable'

// Utilities
import mixins from '../../util/mixins'

export default mixins(
  BaseSlideGroup,
  Themeable
).extend({
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
        'v-tabs__bar': true,
        ...this.themeClasses
      }
    }
  }
})
