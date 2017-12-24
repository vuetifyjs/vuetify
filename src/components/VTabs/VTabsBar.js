// Component imports
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import {
  inject as RegistrableInject
} from '../../mixins/registrable'

// Directives
import Resize from '../../directives/resize'
import Touch from '../../directives/touch'

export default {
  name: 'v-tabs-bar',

  mixins: [
    Colorable,
    RegistrableInject('tabs', 'v-tabs-bar', 'v-tabs'),
    Themeable
  ],

  directives: {
    Resize,
    Touch
  },

  provide () {
    return {
      slider: this.slider
    }
  },

  data: () => ({
    defaultColor: 'white',
    isOverflowing: false,
    itemOffset: 0,
    resizeTimeout: null,
    scrollOffset: 0,
    startX: 0,
    tabsContainer: null,
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
    hideArrows: Boolean,
    iconsAndText: Boolean,
    mobileBreakPoint: {
      type: [Number, String],
      default: 1264,
      validator: v => !isNaN(parseInt(v))
    },
    prependIcon: {
      type: String,
      default: 'chevron_left'
    }
  },

  computed: {
    classes () {
      return {
        'tabs__bar--align-with-title': this.alignWithTitle,
        'tabs__bar--centered': this.centered || this.fixedTabs,
        'tabs__bar--fixed-tabs': this.fixedTabs,
        'tabs__bar--grow': this.grow,
        'tabs__bar--icons-and-text': this.iconsAndText,
        'tabs__bar--overflow': !this.hideArrows && this.isOverflowing,
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
    }
  },

  watch: {
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
  },

  beforeDestroy () {
    this.tabs.unregister('bar', 'bar')
  },

  methods: {
    genContainer () {
      return this.$createElement('div', {
        staticClass: 'tabs__container',
        style: this.containerStyles,
        ref: 'container'
      }, this.$slots.default)
    },
    genIcon (direction) {
      if ((!this[`${direction}IconVisible`] &&
        !this.isMobile) ||
        this.hideArrows ||
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
            start: this.onTouchStart,
            move: this.onTouchMove,
            end: this.onTouchEnd
          }
        }]
      }, [this.genContainer()])
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
      this.genWrapper(),
      this.genTransition('prepend'),
      this.genTransition('append')
    ])
  }
}
