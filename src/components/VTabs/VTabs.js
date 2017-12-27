// Styles
require('../../stylus/components/_tabs.styl')

// Component imports
import VIcon from '../VIcon'
import VTabsSlider from './VTabsSlider'

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

// Helpers
import { filterChildren } from '../../util/helpers'

export default {
  name: 'v-tabs',

  components: {
    VIcon,
    VTabsSlider
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

  directives: {
    Resize,
    Touch
  },

  provide () {
    return {
      tabClick: this.tabClick,
      registerItems: this.registerItems,
      unregisterItems: this.unregisterItems
    }
  },

  data: () => ({
    content: [],
    bar: [],
    isBooted: false,
    defaultColor: 'white',
    isOverflowing: false,
    itemOffset: 0,
    lazyValue: null,
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
  }),

  methods: {
    callSlider () {
      this.setOverflow()
      if (!this.activeTab) return

      // Give screen time to paint
      this.$nextTick(() => {
        const activeTab = document.querySelector(`[href="#${this.activeTab.id}"]`)

        this.sliderWidth = (
          activeTab.scrollWidth /
          this.$refs.container.clientWidth *
          100
        )
        this.sliderLeft = activeTab.offsetLeft
      })
    },
    /**
     * When v-navigation-drawer changes the
     * width of the container, call resize
     * after the transition is complete
     *
     * @return {Void}
     */
    onContainerResize () {
      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(this.callBar, this.transitionTime)
    },
    onResize () {
      if (this._isDestroyed) return
      this.scrollOffset = 0
      this.callSlider()
      this.setOverflow()
    },
    overflowCheck (e, fn) {
      this.isOverflowing && fn(e)
    },
    scrollTo (direction) {
      const { offset, index } = this.newOffset(direction)
      this.scrollOffset = offset
      this.itemOffset = index
    },
    setOverflow () {
      const container = this.$refs.container
      this.isOverflowing = container.clientWidth < container.scrollWidth
    },
    findActiveLink () {
      if (!this.tabs.length || this.value) return

      const activeIndex = this.tabs.findIndex(tabItem => {
        return tabItem.id === this.value ||
          tabItem.el.firstChild.className.indexOf('tabs__item--active') > -1
      })

      this.inputValue = this.tabs[activeIndex > -1 ? activeIndex : 0].id
    },
    register (options) {
      this.tabs.push(options)
    },
    tabClick (target) {
      this.inputValue = target
    },
    registerItems (fn) {
      this.tabItems = fn
    },
    unregisterItems () {
      this.tabItems = null
    },
    unregister (id) {
      this.tabs = this.tabs.filter(o => o.id !== id)
    },
    updateTabs () {
      this.tabs.forEach(({ toggle }) => {
        toggle(this.target)
      })

      this.setOverflow()
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'tabs',
      'class': this.addBackgroundColorClassChecks(this.classes),
      directives: [{
        name: 'resize',
        arg: 400,
        modifiers: { quiet: true },
        value: this.onResize
      }]
    }, [
      this.genTransition('prepend'),
      this.genWrapper(),
      filterChildren(this.$slots.default, 'v-tabs-items'),
      this.genTransition('append')
    ])
  }
}
