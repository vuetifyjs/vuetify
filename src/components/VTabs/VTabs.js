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

export default {
  name: 'v-tabs',

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

  directives: {
    Resize,
    Touch
  },

  provide () {
    return {
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
      transitionTime: 300
    }
  },

  methods: {
    checkPrevIcon () {
      return this.scrollOffset > 0
    },
    checkNextIcon () {
      // Check one scroll ahead to know the width of right-most item
      const container = this.$refs.container
      const wrapper = this.$refs.wrapper

      return container.clientWidth > this.scrollOffset + wrapper.clientWidth
    },
    callSlider () {
      this.setOverflow()
      if (this.hideSlider || !this.activeTab) return false

      // Give screen time to paint
      const action = this.activeTab.action
      const activeTab = action === this.activeTab
        ? this.activeTab
        : this.tabs.find(tab => tab.action === action)

      if (!activeTab) return
      this.sliderWidth = activeTab.$el.scrollWidth
      this.sliderLeft = activeTab.$el.offsetLeft
    },
    /**
     * When v-navigation-drawer changes the
     * width of the container, call resize
     * after the transition is complete
     */
    onContainerResize () {
      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(this.callSlider, this.transitionTime)
    },
    onResize () {
      if (this._isDestroyed) return

      this.callSlider()
      this.scrollIntoView()
    },
    overflowCheck (e, fn) {
      this.isOverflowing && fn(e)
    },
    scrollTo (direction) {
      this.scrollOffset = this.newOffset(direction)
    },
    setOverflow () {
      this.isOverflowing = this.$refs.bar.clientWidth < this.$refs.container.clientWidth
    },
    findActiveLink () {
      if (!this.tabs.length || this.lazyValue) return

      const activeIndex = this.tabs.findIndex((tabItem, index) => {
        const id = tabItem.action === tabItem ? index.toString() : tabItem.action
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
      if (!this.activeTab) return false

      const { clientWidth, offsetLeft } = this.activeTab.$el
      const wrapperWidth = this.$refs.wrapper.clientWidth
      const totalWidth = wrapperWidth + this.scrollOffset
      const itemOffset = clientWidth + offsetLeft
      const additionalOffset = clientWidth * 0.3

      /* instanbul ignore else */
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

  mounted () {
    this.prevIconVisible = this.checkPrevIcon()
    this.nextIconVisible = this.checkNextIcon()
  },

  render (h) {
    const { tab, slider, items, item } = this.parseNodes()

    return h('div', {
      staticClass: 'tabs',
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
