// Styles
require('../../stylus/components/_tabs.styl')

// Component imports
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import {
  inject as RegistrableInject
} from '../../mixins/registrable'
import SSRBootable from '../../mixins/ssr-bootable'
import Themeable from '../../mixins/themeable'

// Directives
import Resize from '../../directives/resize'
import Touch from '../../directives/touch'

export default {
  name: 'v-tabs',

  mixins: [
    Colorable,
    RegistrableInject('tabs', 'v-tabs-bar', 'v-tabs'),
    SSRBootable,
    Themeable
  ],

  directives: {
    Resize,
    Touch
  },

  provide () {
    return {
      slider: this.slider,
      tabClick: this.tabClick
    }
  },

  data: () => ({
    activeIndex: null,
    content: [],
    bar: [],
    isBooted: false,
    reverse: false,
    defaultColor: 'white',
    isOverflowing: false,
    itemOffset: 0,
    resizeTimeout: null,
    scrollOffset: 0,
    startX: 0,
    tabsContainer: null,
    tabItems: [],
    tabsSlider: null,
    targetEl: null,
    transitionTime: 300
  }),

  props: {
    alignWithTitle: Boolean,
    appendIcon: {
      type: String,
      default: 'chevron_right'
    },
    centered: Boolean,
    fixedTabs: Boolean,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: undefined,
      validator: v => !isNaN(parseInt(v))
    },
    iconsAndText: Boolean,
    mobileBreakPoint: {
      type: [Number, String],
      default: 1264,
      validator: v => !isNaN(parseInt(v))
    },
    prependIcon: {
      type: String,
      default: 'chevron_left'
    },
    showArrows: Boolean,
    value: String
  },

  computed: {
    activeTab () {
      if (!this.tabItems.length) return undefined

      return this.tabItems[this.activeIndex]
    },
    classes () {
      return {
        'tabs__bar--align-with-title': this.alignWithTitle,
        'tabs__bar--centered': this.centered,
        'tabs__bar--fixed-tabs': this.fixedTabs,
        'tabs__bar--grow': this.grow,
        'tabs__bar--icons-and-text': this.iconsAndText,
        'tabs__bar--is-mobile': this.isMobile,
        'tabs__bar--overflow': this.isOverflowing,
        'tabs__bar--show-arrows': this.showArrows,
        'theme--dark': this.dark,
        'theme--light': this.light
      }
    },
    computedHeight () {
      if (this.height) return this.height

      return this.iconsAndText ? 72 : 48
    },
    containerStyles () {
      return {
        height: `${parseInt(this.computedHeight)}px`,
        transform: `translateX(${-this.scrollOffset}px)`
      }
    },
    isMobile () {
      return this.$vuetify.breakpoint.width < this.mobileBreakPoint
    },
    prependIconVisible () {
      return this.isOverflowing &&
        this.scrollOffset > 0
    },
    appendIconVisible () {
      if (!this.isOverflowing) return

      // Check one scroll ahead to know the width of right-most item
      const container = this.$refs.container
      const item = this.newOffsetAppend(this.scrollOffset, this.itemOffset)
      const itemWidth = item && container.children[item.index].clientWidth || 0
      const scrollOffset = this.scrollOffset + container.clientWidth

      return container.scrollWidth - scrollOffset > itemWidth * 0.30
    },
    target () {
      return this.activeTab
        ? this.activeTab.id
        : null
    }
  },

  watch: {
    activeIndex (current, previous) {
      this.reverse = current < previous
      this.updateTabs()
    },
    activeTab (val) {
      this.$emit('input', (val && val.id || val))
    },
    bar (val) {
      if (!val || !this.activeTab) return

      // Welcome to suggestions for solving
      // initial load positioning
      this.updateTabs()
    },
    tabItems (newItems, oldItems) {
      if (!newItems.length) return (this.activeIndex = null)
      if (!oldItems.length) return this.findActiveLink()

      const newIndex = newItems.findIndex(o => o.id === this.target)

      if (newIndex > -1) return this.activeIndex = newIndex

      this.activeIndex = newItems.length - 1
    },
    value (val) {
      this.tabClick(val)
    },
    '$vuetify.application.left' () {
      this.onContainerResize()
    },
    '$vuetify.application.right' () {
      this.onContainerResize()
    }
  },

  mounted () {
    this.tabs.register('bar', {
      action: this.slider,
      id: 'bar'
    })

    !this.tabsSlider && this.setOverflow()
  },

  beforeDestroy () {
    this.tabs.unregister('bar', 'bar')
  },

  methods: {
    genContainer () {
      // const defaultSlot = this.$slots.default
      // defaultSlot.splice(0, 1, this.genSlider())
      return this.$createElement('div', {
        staticClass: 'tabs__container',
        style: this.containerStyles,
        ref: 'container'
      }, this.$slots.default)
    },
    genIcon (direction) {
      if ((!this[`${direction}IconVisible`] &&
        !this.isMobile) ||
        !this.showArrows ||
        !this.isOverflowing
      ) return null

      return this.$createElement(VIcon, {
        staticClass: `icon--${direction}`,
        style: { display: 'inline-flex' },
        props: {
          disabled: !this[`${direction}IconVisible`]
        },
        on: {
          click: () => this.scrollTo(direction)
        }
      }, this[`${direction}Icon`])
    },
    genTransition (direction) {
      return this.$createElement('transition', {
        props: { name: 'fade-transition' }
      }, [this.genIcon(direction)])
    },
    genWrapper () {
      return this.$createElement('div', {
        staticClass: 'tabs__wrapper',
        directives: [{
          name: 'touch',
          value: {
            start: e => this.overflowCheck(e, this.onTouchStart),
            move: e => this.overflowCheck(e, this.onTouchMove),
            end: e => this.overflowCheck(e, this.onTouchEnd)
          }
        }]
      }, [this.genContainer(), this.genSlider()])
    },
    genSlider () {
      if (this.$scopedSlots.slider) return this.$scopedSlots.slider()

      return this.$createElement('v-tabs-slider')
    },
    isSlider (el) {
      return el.className.indexOf('tabs__slider') > -1
    },
    newOffset (direction) {
      const capitalize = `${direction.charAt(0).toUpperCase()}${direction.slice(1)}`
      const container = this.$refs.container
      const items = container.children

      return this[`newOffset${capitalize}`](container, items)
    },
    newOffsetPrepend (container, items, offset = 0) {
      for (let index = this.itemOffset - 1; index >= 0; index--) {
        if (this.isSlider(items[index])) continue

        const newOffset = offset + items[index].clientWidth
        if (newOffset >= container.clientWidth) {
          return { offset: this.scrollOffset - offset, index: index + 1 }
        }
        offset = newOffset
      }

      return { offset: 0, index: 0 }
    },
    newOffsetAppend (container, items, offset = this.scrollOffset) {
      for (let index = this.itemOffset; index < items.length; index++) {
        if (this.isSlider(items[index])) continue

        const newOffset = offset + items[index].clientWidth
        if (newOffset > this.scrollOffset + container.clientWidth) {
          return { offset, index }
        }
        offset = newOffset
      }

      return null
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

      this.slider()
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
    slider (el) {
      this.setOverflow()

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
    onTouchStart (e) {
      this.startX = this.scrollOffset + e.touchstartX
      this.$refs.container.style.transition = 'none'
    },
    onTouchMove (e) {
      this.scrollOffset = this.startX - e.touchmoveX
    },
    onTouchEnd (e) {
      this.onResize()
      const container = this.$refs.container
      const scrollWidth = container.scrollWidth - this.$el.clientWidth / 2
      container.style.transition = null

      if (this.scrollOffset < 0 || !this.isOverflowing) {
        this.scrollOffset = 0
      } else if (this.scrollOffset >= scrollWidth) {
        const lastItem = container.children[container.children.length - 1]
        this.scrollOffset = scrollWidth - lastItem.clientWidth
      }
    },
    findActiveLink () {
      if (!this.tabItems.length) return

      const activeIndex = this.tabItems.findIndex(tabItem => {
        return tabItem.id === this.value ||
          tabItem.el.firstChild.className.indexOf('tabs__item--active') > -1
      })

      // If we found an active link
      if (activeIndex > -1) {
        return (this.activeIndex = activeIndex)
      }

      if (!this.isBooted &&
        this.content.length > 0 &&
        this.tabItems.length > 0
      ) {
        this.activeIndex = 0
      }
    },
    // Potential Vue bug,
    // pushing to this[type]
    // makes the tabItems
    // watcher new and old
    // items always match
    register (type, args) {
      const mask = this[type].slice()
      mask.push(args)

      this[type] = mask
    },
    tabClick (target) {
      this.activeIndex = this.tabItems.findIndex(tab => tab.id === target)
    },
    unregister (type, id) {
      this[type] = this[type].filter(o => o.id !== id)
    },
    updateTabs () {
      this.tabItems.forEach(({ toggle }) => {
        toggle(this.target)
      })

      this.callBar()
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'tabs__bar',
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
      this.genTransition('append')
    ])
  }
}
