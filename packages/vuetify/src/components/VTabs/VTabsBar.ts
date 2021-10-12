// Extensions
import { BaseSlideGroup } from '../VSlideGroup/VSlideGroup'

// Components
import VTab from './VTab'

// Mixins
import Themeable from '../../mixins/themeable'
import SSRBootable from '../../mixins/ssr-bootable'

// Utilities
import mixins from '../../util/mixins'

// Types
import { Route } from 'vue-router'
import { VNode } from 'vue'

type VTabInstance = InstanceType<typeof VTab>

export default mixins(
  BaseSlideGroup,
  SSRBootable,
  Themeable
  /* @vue/component */
).extend({
  name: 'v-tabs-bar',

  provide () {
    return {
      tabsBar: this,
    }
  },

  computed: {
    classes () {
      return {
        ...BaseSlideGroup.options.computed.classes.call(this),
        'v-tabs-bar': true,
        'v-tabs-bar--is-mobile': this.isMobile,
        // TODO: Remove this and move to v-slide-group
        'v-tabs-bar--show-arrows': this.showArrows,
        ...this.themeClasses,
      }
    },
  },

  watch: {
    items: 'callSlider',
    internalValue: 'callSlider',
    $route: 'onRouteChange',
  },

  methods: {
    callSlider () {
      if (!this.isBooted) return

      this.$emit('call:slider')
    },
    genContent () {
      const render = BaseSlideGroup.options.methods.genContent.call(this)

      render.data = render.data || {}
      render.data.staticClass += ' v-tabs-bar__content'

      return render
    },
    onRouteChange (val: Route, oldVal: Route) {
      /* istanbul ignore next */
      if (this.mandatory) return

      const items = this.items as unknown as VTabInstance[]
      const newPath = val.path
      const oldPath = oldVal.path

      let hasNew = false
      let hasOld = false

      for (const item of items) {
        if (item.to === oldPath) hasOld = true
        else if (item.to === newPath) hasNew = true

        if (hasNew && hasOld) break
      }

      // If we have an old item and not a new one
      // it's assumed that the user navigated to
      // a path that is not present in the items
      if (!hasNew && hasOld) this.internalValue = undefined
    },
  },

  render (h): VNode {
    const render = BaseSlideGroup.options.render.call(this, h)

    render.data!.attrs = {
      role: 'tablist',
    }

    return render
  },
})
