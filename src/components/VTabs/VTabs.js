// Styles
require('../../stylus/components/_tabs.styl')

// Component imports
import VIcon from '../VIcon'
import VTabsItems from './VTabsItems'
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

export default {
  name: 'v-tabs',

  components: {
    VIcon,
    VTabsItems,
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

  data () {
    return {
      content: [],
      bar: [],
      isBooted: false,
      isOverflowing: false,
      itemOffset: 0,
      lazyValue: this.value,
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
    callSlider () {
      this.setOverflow()
      if (!this.activeTab) return false

      // Give screen time to paint
      this.$nextTick(() => {
        const activeTab = this.$el.querySelector(`[href="#${this.activeTab.id}"]`)

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
     */
    onContainerResize () {
      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(this.callSlider, this.transitionTime)
    },
    onResize () {
      if (this._isDestroyed) return
      this.scrollOffset = 0
      this.callSlider()
    },
    overflowCheck (e, fn) {
      this.isOverflowing && fn(e)
    },
    scrollTo (direction) {
      const newOffset = this.newOffset(direction)

      if (!newOffset) return

      const { offset, index } = newOffset

      this.scrollOffset = offset
      this.itemOffset = index
    },
    setOverflow () {
      const container = this.$refs.container
      this.isOverflowing = container.clientWidth < container.scrollWidth
    },
    findActiveLink () {
      if (!this.tabs.length || this.lazyValue) return

      const activeIndex = this.tabs.findIndex(tabItem => {
        return tabItem.id === this.lazyValue ||
          tabItem.el.firstChild.className.indexOf(this.activeClass) > -1
      })

      /* istanbul ignore next */
      // There is not a reliable way to test
      this.inputValue = this.tabs[activeIndex > -1 ? activeIndex : 0].id
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
            case 'v-tab': tab.push(vnode)
              break
            case 'v-tabs-slider': slider.push(vnode)
              break
            case 'v-tabs-items': items.push(vnode)
              break
            case 'v-tab-item': item.push(vnode)
              break
          }
        }
      }

      return { tab, slider, items, item }
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
    const { tab, slider, items, item } = this.parseNodes()

    return h('div', {
      staticClass: 'tabs',
      'class': this.classes,
      directives: [{
        name: 'resize',
        arg: 400,
        modifiers: { quiet: true },
        value: this.onResize
      }]
    }, [
      this.genTransition('prepend'),
      this.genWrapper(
        this.genContainer([
          this.genSlider(slider),
          tab
        ])
      ),
      this.genItems(items, item),
      this.genTransition('append')
    ])
  }
}
