// Styles
import '../../stylus/components/_tabs.styl'

// Extensions
import { BaseItemGroup } from '../VItemGroup/VItemGroup'

// Component level mixins
import TabsComputed from './mixins/tabs-computed'
import TabsGenerators from './mixins/tabs-generators'
import TabsProps from './mixins/tabs-props'
import TabsTouch from './mixins/tabs-touch'
import TabsWatchers from './mixins/tabs-watchers'

// Mixins
import Colorable from '../../mixins/colorable'
import SSRBootable from '../../mixins/ssr-bootable'
import Themeable from '../../mixins/themeable'

// Directives
import Resize from '../../directives/resize'
import Touch from '../../directives/touch'
import { deprecate } from '../../util/console'

// Utils
import ThemeProvider from '../../util/ThemeProvider'

/* @vue/component */
export default BaseItemGroup.extend({
  name: 'v-tabs',

  directives: {
    Resize,
    Touch
  },

  mixins: [
    Colorable,
    SSRBootable,
    TabsComputed,
    TabsProps,
    TabsGenerators,
    TabsTouch,
    TabsWatchers,
    Themeable
  ],

  provide () {
    return {
      tabGroup: this,
      tabProxy: this.tabProxy,
      registerItems: this.registerItems,
      unregisterItems: this.unregisterItems
    }
  },

  data () {
    return {
      bar: [],
      content: [],
      isOverflowing: false,
      nextIconVisible: false,
      prevIconVisible: false,
      resizeTimeout: null,
      scrollOffset: 0,
      sliderWidth: null,
      sliderLeft: null,
      startX: 0,
      tabItems: null,
      transitionTime: 300,
      widths: {
        bar: 0,
        container: 0,
        wrapper: 0
      }
    }
  },

  watch: {
    items: 'onResize',
    tabs: 'onResize'
  },

  mounted () {
    this.init()
  },

  methods: {
    checkIcons () {
      this.prevIconVisible = this.checkPrevIcon()
      this.nextIconVisible = this.checkNextIcon()
    },
    checkPrevIcon () {
      return this.scrollOffset > 0
    },
    checkNextIcon () {
      // Check one scroll ahead to know the width of right-most item
      return this.widths.container > this.scrollOffset + this.widths.wrapper
    },
    callSlider () {
      if (this.hideSlider || !this.activeTab) return false

      // Give screen time to paint
      const activeTab = this.activeTab

      this.$nextTick(() => {
        /* istanbul ignore if */
        if (!activeTab || !activeTab.$el) return
        this.sliderWidth = activeTab.$el.scrollWidth
        this.sliderLeft = activeTab.$el.offsetLeft
      })
    },
    // Do not process
    // until DOM is
    // painted
    init () {
      /* istanbul ignore next */
      if (this.$listeners['input']) {
        deprecate('@input', '@change', this)
      }
    },
    /**
     * When v-navigation-drawer changes the
     * width of the container, call resize
     * after the transition is complete
     */
    onResize () {
      if (this._isDestroyed) return

      this.setWidths()

      const delay = this.isBooted ? this.transitionTime : 0

      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(this.updateTabsView, delay)
    },
    overflowCheck (e, fn) {
      this.isOverflowing && fn(e)
    },
    scrollTo (direction) {
      this.scrollOffset = this.newOffset(direction)
    },
    setOverflow () {
      this.isOverflowing = this.widths.bar < this.widths.container
    },
    setWidths () {
      const bar = this.$refs.bar ? this.$refs.bar.clientWidth : 0
      const container = this.$refs.container ? this.$refs.container.clientWidth : 0
      const wrapper = this.$refs.wrapper ? this.$refs.wrapper.clientWidth : 0

      this.widths = { bar, container, wrapper }

      this.setOverflow()
    },
    parseNodes () {
      const item = []
      const items = []
      const slider = []
      const tab = []
      const length = (this.$slots.default || []).length

      for (let i = 0; i < length; i++) {
        const vnode = this.$slots.default[i]

        if (vnode.componentOptions) {
          switch (vnode.componentOptions.Ctor.options.name) {
            case 'v-tabs-slider': slider.push(vnode)
              break
            case 'v-tabs-items': items.push(vnode)
              break
            case 'v-tab-item': item.push(vnode)
              break
            // case 'v-tab' - intentionally omitted
            default: tab.push(vnode)
          }
        } else {
          tab.push(vnode)
        }
      }

      return { tab, slider, items, item }
    },
    registerItems (fn) {
      this.tabItems = fn
      fn(this.internalValue)
    },
    unregisterItems () {
      this.tabItems = null
    },
    updateTabsView () {
      this.callSlider()
      this.scrollIntoView()
      this.checkIcons()
    },
    scrollIntoView () {
      /* istanbul ignore next */
      if (!this.activeTab) return
      if (!this.isOverflowing) return (this.scrollOffset = 0)

      const totalWidth = this.widths.wrapper + this.scrollOffset
      const { clientWidth, offsetLeft } = this.activeTab.$el
      const itemOffset = clientWidth + offsetLeft
      let additionalOffset = clientWidth * 0.3

      if (this.activeTab === this.items[this.items.length - 1]) {
        additionalOffset = 0 // don't add an offset if selecting the last tab
      }

      /* istanbul ignore else */
      if (offsetLeft < this.scrollOffset) {
        this.scrollOffset = Math.max(offsetLeft - additionalOffset, 0)
      } else if (totalWidth < itemOffset) {
        this.scrollOffset -= totalWidth - itemOffset - additionalOffset
      }
    },
    tabProxy (val) {
      this.internalValue = val
    }
  },

  render (h) {
    const { tab, slider, items, item } = this.parseNodes()

    return h('div', {
      staticClass: 'v-tabs',
      directives: [{
        name: 'resize',
        modifiers: { quiet: true },
        value: this.onResize
      }]
    }, [
      this.genBar([this.hideSlider ? null : this.genSlider(slider), tab]),
      h(ThemeProvider, {
        props: { dark: this.theme.isDark, light: !this.theme.isDark }
      }, [
        this.genItems(items, item)
      ])
    ])
  }
})
