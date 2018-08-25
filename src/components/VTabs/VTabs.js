// Styles
import '../../stylus/components/_tabs.styl'

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
import {
  provide as RegistrableProvide
} from '../../mixins/registrable'

// Directives
import Resize from '../../directives/resize'
import Touch from '../../directives/touch'

/* @vue/component */
export default {
  name: 'v-tabs',

  directives: {
    Resize,
    Touch
  },

  mixins: [
    RegistrableProvide('tabs'),
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
      tabs: this,
      tabClick: this.tabClick,
      tabProxy: this.tabProxy,
      registerItems: this.registerItems,
      unregisterItems: this.unregisterItems
    }
  },

  data () {
    return {
      bar: [],
      content: [],
      isBooted: false,
      isOverflowing: false,
      lazyValue: this.value,
      nextIconVisible: false,
      prevIconVisible: false,
      resizeTimeout: null,
      reverse: false,
      scrollOffset: 0,
      sliderWidth: null,
      sliderLeft: null,
      startX: 0,
      tabsContainer: null,
      tabs: [],
      tabItems: null,
      transitionTime: 300,
      widths: {
        bar: 0,
        container: 0,
        wrapper: 0
      }
    }
  },

  computed: {
    isDark () {
      // Always inherit from parent
      return this.theme.isDark
    },
    selfIsDark () {
      return Themeable.options.computed.isDark.call(this)
    },
    themeClasses () {
      return {
        'theme--dark': this.selfIsDark,
        'theme--light': !this.selfIsDark
      }
    }
  },

  watch: {
    tabs: 'onResize'
  },

  mounted () {
    this.checkIcons()
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
      const action = (this.activeTab || {}).action
      const activeTab = action === this.activeTab
        ? this.activeTab
        : this.tabs.find(tab => tab.action === action)

      this.$nextTick(() => {
        if (!activeTab || !activeTab.$el) return
        this.sliderWidth = activeTab.$el.scrollWidth
        this.sliderLeft = activeTab.$el.offsetLeft
      })
    },
    /**
     * When v-navigation-drawer changes the
     * width of the container, call resize
     * after the transition is complete
     */
    onResize () {
      if (this._isDestroyed) return

      this.setWidths()

      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(() => {
        this.callSlider()
        this.scrollIntoView()
        this.checkIcons()
      }, this.transitionTime)
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
    findActiveLink () {
      if (!this.tabs.length) return

      const activeIndex = this.tabs.findIndex((tabItem, index) => {
        const id = tabItem.action === tabItem ? index : tabItem.action
        return id === this.lazyValue ||
          tabItem.$el.firstChild.className.indexOf(this.activeClass) > -1
      })

      const index = activeIndex > -1 ? activeIndex : 0
      const tab = this.tabs[index]

      /* istanbul ignore next */
      // There is not a reliable way to test
      this.inputValue = tab.action === tab ? index : tab.action
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
    register (options) {
      this.tabs.push(options)
    },
    scrollIntoView () {
      if (!this.activeTab) return
      if (!this.isOverflowing) return (this.scrollOffset = 0)

      const totalWidth = this.widths.wrapper + this.scrollOffset
      const { clientWidth, offsetLeft } = this.activeTab.$el
      const itemOffset = clientWidth + offsetLeft
      let additionalOffset = clientWidth * 0.3
      if (this.activeIndex === this.tabs.length - 1) {
        additionalOffset = 0 // don't add an offset if selecting the last tab
      }

      /* istanbul ignore else */
      if (offsetLeft < this.scrollOffset) {
        this.scrollOffset = Math.max(offsetLeft - additionalOffset, 0)
      } else if (totalWidth < itemOffset) {
        this.scrollOffset -= totalWidth - itemOffset - additionalOffset
      }
    },
    tabClick (tab) {
      this.inputValue = tab.action === tab ? this.tabs.indexOf(tab) : tab.action
      this.scrollIntoView()
    },
    tabProxy (val) {
      this.inputValue = val
    },
    registerItems (fn) {
      this.tabItems = fn
    },
    unregisterItems () {
      this.tabItems = null
    },
    unregister (tab) {
      this.tabs = this.tabs.filter(o => o !== tab)
    },
    updateTabs () {
      for (let index = this.tabs.length; --index >= 0;) {
        this.tabs[index].toggle(this.target)
      }

      this.setOverflow()
    }
  },

  render (h) {
    const { tab, slider, items, item } = this.parseNodes()

    return h('div', {
      staticClass: 'v-tabs',
      directives: [{
        name: 'resize',
        arg: 400,
        modifiers: { quiet: true },
        value: this.onResize
      }]
    }, [
      this.genBar([this.hideSlider ? null : this.genSlider(slider), tab]),
      this.genItems(items, item)
    ])
  }
}
