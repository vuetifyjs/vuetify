// Extensions
import { BaseSlideGroup } from '../VSlideGroup/VSlideGroup'

// Mixins
import Themeable from '../../mixins/themeable'
import SSRBootable from '../../mixins/ssr-bootable'

// Utilities
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

export default mixins(
  BaseSlideGroup,
  SSRBootable,
  Themeable
  /* @vue/component */
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

  watch: {
    items: 'callSlider',
    internalValue: 'callSlider',
    $route: 'onRouteChange'
  },

  methods: {
    callSlider () {
      if (!this.isBooted) return

      this.$emit('call:slider')
    },
    onRouteChange (val: any, oldVal: any) {
      /* istanbul ignore next */
      if (this.mandatory) return

      const newPath = val.path
      const oldPath = oldVal.path

      let hasNew = false
      let hasOld = false

      for (const item of this.items) {
        if (item.to === newPath) hasNew = true
        else if (item.to === oldPath) hasOld = true

        if (hasNew && hasOld) break
      }

      // If we have an old item and not a new one
      // it's assumed that the user navigated to
      // a path that is not present in the items
      if (!hasNew && hasOld) this.internalValue = undefined
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
