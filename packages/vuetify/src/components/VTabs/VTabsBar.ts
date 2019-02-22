// Extensions
import { BaseSlideGroup } from '../VSlideGroup/VSlideGroup'

// Mixins
import Themeable from '../../mixins/themeable'

// Utilities
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

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
  },

  render (h): VNode {
    const render = BaseSlideGroup.options.render.call(this, h)

    render.data!.attrs = {
      role: 'tablist'
    }

    return render
  }
})
