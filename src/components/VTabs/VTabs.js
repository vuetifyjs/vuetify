require('../../stylus/components/_tabs.styl')

import Resize from '../../directives/resize'

export default {
  name: 'v-tabs',

  directives: {
    Resize
  },

  provide () {
    return {
      registerContent: this.registerContent,
      unregisterContent: this.unregisterContent,
      registerTabItem: this.registerTabItem,
      unregisterTabItem: this.unregisterTabItem,
      next: this.next,
      prev: this.prev,
      slider: this.slider,
      tabClick: this.tabClick,
      isScrollable: () => this.scrollable,
      isMobile: () => this.isMobile
    }
  },

  data () {
    return {
      activeIndex: null,
      content: [],
      isBooted: false,
      resizeTimeout: null,
      reverse: false,
      tabItems: [],
      tabsContainer: null,
      tabsSlider: null,
      target: null,
      targetEl: null,
      transitionTime: 300
    }
  },

  props: {
    centered: Boolean,
    fixed: Boolean,
    grow: Boolean,
    icons: Boolean,
    mobileBreakPoint: {
      type: [Number, String],
      default: 1280
    },
    value: String,
    scrollable: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes () {
      return {
        'tabs': true,
        'tabs--centered': this.centered,
        'tabs--fixed': this.fixed,
        'tabs--grow': this.grow,
        'tabs--icons': this.icons,
        'tabs--mobile': this.isMobile,
        'tabs--scroll-bars': this.scrollable
      }
    },
    isMobile () {
      return this.$vuetify.breakpoint.width < this.mobileBreakPoint
    }
  },

  watch: {
    value () {
      this.tabClick(this.value)
    },
    activeIndex () {
      this.updateTabs()
      this.$nextTick(() => (this.isBooted = true))
    },
    tabItems (newItems, oldItems) {
      // Tab item was removed and
      // there are still more
      if (oldItems.length > newItems.length &&
        newItems.length > 0
      ) {
        if (!newItems.find(o => o.id === this.target)) {
          const i = oldItems.findIndex(o => o.id === this.target)

          this.$nextTick(() => {
            this.activeIndex = this.tabItems[i > 0 ? i - 1 : 0].id
            this.target = this.activeIndex
          })
        }
      }
      this.slider()
    },
    '$vuetify.application.left' () {
      this.onContainerResize()
    },
    '$vuetify.application.right' () {
      this.onContainerResize()
    }
  },

  mounted () {
    // This is a workaround to detect if link is active
    // when being used as a router or nuxt link
    const i = this.tabItems.findIndex(({ el }) => {
      return el.firstChild.classList.contains('tabs__item--active')
    })

    const tab = this.value || (this.tabItems[i !== -1 ? i : 0] || {}).id

    tab && this.tabClick(tab)
  },

  methods: {
    registerContent (id, toggle) {
      this.content.push({ id, toggle })
    },
    registerTabItem (id, toggle, el) {
      this.tabItems.push({ id, toggle, el })
    },
    unregisterContent (id) {
      this.content = this.content.filter(o => o.id !== id)
    },
    unregisterTabItem (id) {
      this.tabItems = this.tabItems.filter(o => o.id !== id)
    },
    next (cycle) {
      let nextIndex = this.activeIndex + 1

      if (!this.content[nextIndex]) {
        if (!cycle) return
        nextIndex = 0
      }

      this.tabClick(this.tabItems[nextIndex].id)
    },
    prev (cycle) {
      let prevIndex = this.activeIndex - 1

      if (!this.content[prevIndex]) {
        if (!cycle) return
        prevIndex = this.content.length - 1
      }

      this.tabClick(this.tabItems[prevIndex].id)
    },
    onResize () {
      this.slider()
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
      this.resizeTimeout = setTimeout(this.onResize, this.transitionTime)
    },
    slider (el) {
      this.tabsSlider = this.tabsSlider ||
        !!this.$el && this.$el.querySelector('.tabs__slider')

      this.tabsContainer = this.tabsContainer ||
        !!this.$el && this.$el.querySelector('.tabs__container')

      if (!this.tabsSlider || !this.tabsContainer) return

      this.targetEl = el || this.targetEl

      if (!this.targetEl) return

      // Gives DOM time to paint when
      // processing slider for
      // dynamic tabs
      this.$nextTick(() => {
        // #684 Calculate width as %
        const width = (
          this.targetEl.scrollWidth /
          this.tabsContainer.clientWidth *
          100
        )

        this.tabsSlider.style.width = `${width}%`
        this.tabsSlider.style.left = `${this.targetEl.offsetLeft}px`
      })
    },
    tabClick (target) {
      const setActiveIndex = index => {
        if (this.activeIndex === index) {
          // #762 update tabs display
          // In case tabs count got changed but activeIndex didn't
          this.updateTabs()
        } else {
          this.activeIndex = index
        }
      }

      this.target = target

      this.$nextTick(() => {
        const nextIndex = this.content.findIndex(o => o.id === target)
        this.reverse = nextIndex < this.activeIndex
        setActiveIndex(nextIndex)

        this.$emit('input', this.target)
      })
    },
    updateTabs () {
      this.content.forEach(({ toggle }) => {
        toggle(this.target, this.reverse, this.isBooted)
      })

      this.tabItems.forEach(({ toggle }) => {
        toggle(this.target)
      })
    }
  },

  render (h) {
    return h('div', {
      'class': this.classes,
      directives: [{
        name: 'resize',
        value: this.onResize
      }]
    }, this.$slots.default)
  }
}
