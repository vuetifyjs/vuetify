import './VMenu.sass'

import Vue from 'vue'

// Mixins
import Delayable from '../../mixins/delayable'
import Dependent from '../../mixins/dependent'
import Detachable from '../../mixins/detachable'
import Menuable from '../../mixins/menuable'
import Returnable from '../../mixins/returnable'
import Toggleable from '../../mixins/toggleable'
import Themeable from '../../mixins/themeable'

// Directives
import ClickOutside from '../../directives/click-outside'
import Resize from '../../directives/resize'

// Helpers
import { convertToUnit, keyCodes } from '../../util/helpers'
import ThemeProvider from '../../util/ThemeProvider'

/* @vue/component */
export default Vue.extend({
  name: 'v-menu',

  provide () {
    return {
      // Pass theme through to default slot
      theme: this.theme
    }
  },

  directives: {
    ClickOutside,
    Resize
  },

  mixins: [
    Dependent,
    Delayable,
    Detachable,
    Menuable,
    Returnable,
    Toggleable,
    Themeable
  ],

  props: {
    auto: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true
    },
    closeOnContentClick: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    disableKeys: Boolean,
    fullWidth: Boolean,
    maxHeight: { default: 'auto' },
    openOnClick: {
      type: Boolean,
      default: true
    },
    offsetX: Boolean,
    offsetY: Boolean,
    openOnHover: Boolean,
    origin: {
      type: String,
      default: 'top left'
    },
    transition: {
      type: [Boolean, String],
      default: 'v-menu-transition'
    }
  },

  data () {
    return {
      calculatedTopAuto: 0,
      defaultOffset: 8,
      hasJustFocused: false,
      listIndex: -1,
      resizeTimeout: null,
      tiles: []
    }
  },

  computed: {
    calculatedLeft () {
      const menuWidth = Math.max(this.dimensions.content.width, parseFloat(this.calculatedMinWidth))

      if (!this.auto) return this.calcLeft(menuWidth)

      return `${this.calcXOverflow(this.calcLeftAuto(), menuWidth)}px`
    },
    calculatedMaxHeight () {
      return this.auto ? '200px' : convertToUnit(this.maxHeight)
    },
    calculatedMaxWidth () {
      return isNaN(this.maxWidth)
        ? this.maxWidth
        : `${this.maxWidth}px`
    },
    calculatedMinWidth () {
      if (this.minWidth) {
        return isNaN(this.minWidth)
          ? this.minWidth
          : `${this.minWidth}px`
      }

      const minWidth = Math.min(
        this.dimensions.activator.width +
        this.nudgeWidth +
        (this.auto ? 16 : 0),
        Math.max(this.pageWidth - 24, 0)
      )

      const calculatedMaxWidth = isNaN(parseInt(this.calculatedMaxWidth))
        ? minWidth
        : parseInt(this.calculatedMaxWidth)

      return `${Math.min(
        calculatedMaxWidth,
        minWidth
      )}px`
    },
    calculatedTop () {
      if (!this.auto || this.isAttached) return this.calcTop()

      return `${this.calcYOverflow(this.calculatedTopAuto)}px`
    },
    styles () {
      return {
        maxHeight: this.calculatedMaxHeight,
        minWidth: this.calculatedMinWidth,
        maxWidth: this.calculatedMaxWidth,
        top: this.calculatedTop,
        left: this.calculatedLeft,
        transformOrigin: this.origin,
        zIndex: this.zIndex || this.activeZIndex
      }
    }
  },

  watch: {
    isActive (val) {
      if (!val) this.listIndex = -1
    },
    isContentActive (val) {
      this.hasJustFocused = val
    },
    listIndex (next, prev) {
      if (next in this.tiles) {
        const tile = this.tiles[next]
        tile.classList.add('v-list-item--highlighted')
        this.$refs.content.scrollTop = tile.offsetTop - tile.clientHeight
      }

      prev in this.tiles &&
        this.tiles[prev].classList.remove('v-list-item--highlighted')
    }
  },

  mounted () {
    this.isActive && this.activate()
  },

  methods: {
    activate () {
      // This exists primarily for v-select
      // helps determine which tiles to activate
      this.getTiles()
      // Update coordinates and dimensions of menu
      // and its activator
      this.updateDimensions()
      // Start the transition
      requestAnimationFrame(() => {
        // Once transitioning, calculate scroll and top position
        this.startTransition().then(() => {
          if (this.$refs.content) {
            this.calculatedTopAuto = this.calcTopAuto()
            this.auto && (this.$refs.content.scrollTop = this.calcScrollPosition())
          }
        })
      })
    },
    calcScrollPosition () {
      const $el = this.$refs.content
      const activeTile = $el.querySelector('.v-list-item--active')
      const maxScrollTop = $el.scrollHeight - $el.offsetHeight

      return activeTile
        ? Math.min(maxScrollTop, Math.max(0, activeTile.offsetTop - $el.offsetHeight / 2 + activeTile.offsetHeight / 2))
        : $el.scrollTop
    },
    calcLeftAuto () {
      if (this.isAttached) return 0

      return parseInt(this.dimensions.activator.left - this.defaultOffset * 2)
    },
    calcTopAuto () {
      const $el = this.$refs.content
      const activeTile = $el.querySelector('.v-list-item--active')

      if (!activeTile) {
        this.selectedIndex = null
      }

      if (this.offsetY || !activeTile) {
        return this.computedTop
      }

      this.selectedIndex = Array.from(this.tiles).indexOf(activeTile)

      const tileDistanceFromMenuTop = activeTile.offsetTop - this.calcScrollPosition()
      const firstTileOffsetTop = $el.querySelector('.v-list-item').offsetTop

      return this.computedTop - tileDistanceFromMenuTop - firstTileOffsetTop - 1
    },
    changeListIndex (e) {
      // For infinite scroll and autocomplete, re-evaluate children
      this.getTiles()

      if (e.keyCode === keyCodes.down && this.listIndex < this.tiles.length - 1) {
        this.listIndex++
        // Allow user to set listIndex to -1 so
        // that the list can be un-highlighted
      } else if (e.keyCode === keyCodes.up && this.listIndex > -1) {
        this.listIndex--
      } else if (e.keyCode === keyCodes.enter && this.listIndex !== -1) {
        this.tiles[this.listIndex].click()
      } else { return }
      // One of the conditions was met, prevent default action (#2988)
      e.preventDefault()
    },
    closeConditional (e) {
      return this.isActive &&
        this.closeOnClick &&
        !this.$refs.content.contains(e.target)
    },
    genTransition () {
      if (!this.transition) return this.genContent()

      return this.$createElement('transition', {
        props: {
          name: this.transition
        }
      }, [this.genContent()])
    },
    genDirectives () {
      // Do not add click outside for hover menu
      const directives = !this.openOnHover && this.closeOnClick ? [{
        name: 'click-outside',
        value: () => { this.isActive = false },
        args: {
          closeConditional: this.closeConditional,
          include: () => [this.$el, ...this.getOpenDependentElements()]
        }
      }] : []

      directives.push({
        name: 'show',
        value: this.isContentActive
      })

      return directives
    },
    genContent () {
      const options = {
        attrs: this.getScopeIdAttrs(),
        staticClass: 'v-menu__content',
        'class': {
          ...this.rootThemeClasses,
          'v-menu__content--auto': this.auto,
          'v-menu__content--fixed': this.activatorFixed,
          'menuable__content__active': this.isActive,
          [this.contentClass.trim()]: true
        },
        style: this.styles,
        directives: this.genDirectives(),
        ref: 'content',
        on: {
          click: e => {
            e.stopPropagation()
            if (e.target.getAttribute('disabled')) return
            if (this.closeOnContentClick) this.isActive = false
          },
          keydown: this.onKeyDown
        }
      }

      !this.disabled && this.openOnHover && (options.on.mouseenter = this.mouseEnterHandler)
      this.openOnHover && (options.on.mouseleave = this.mouseLeaveHandler)

      return this.$createElement('div', options, this.showLazyContent(this.$slots.default))
    },
    getTiles () {
      this.tiles = this.$refs.content.querySelectorAll('.v-list-item')
    },
    mouseEnterHandler () {
      this.runDelay('open', () => {
        if (this.hasJustFocused) return

        this.hasJustFocused = true
        this.isActive = true
      })
    },
    mouseLeaveHandler (e) {
      // Prevent accidental re-activation
      this.runDelay('close', () => {
        if (this.$refs.content.contains(e.relatedTarget)) return

        requestAnimationFrame(() => {
          this.isActive = false
          this.callDeactivate()
        })
      })
    },
    onKeyDown (e) {
      if (e.keyCode === keyCodes.esc) {
        // Wait for dependent elements to close first
        setTimeout(() => { this.isActive = false })
        const activator = this.getActivator()
        this.$nextTick(() => activator && activator.focus())
      } else if (e.keyCode === keyCodes.tab) {
        setTimeout(() => {
          if (!this.$refs.content.contains(document.activeElement)) {
            this.isActive = false
          }
        })
      } else {
        this.changeListIndex(e)
      }
    },
    onResize () {
      if (!this.isActive) return

      // Account for screen resize
      // and orientation change
      // eslint-disable-next-line no-unused-expressions
      this.$refs.content.offsetWidth
      this.updateDimensions()

      // When resizing to a smaller width
      // content width is evaluated before
      // the new activator width has been
      // set, causing it to not size properly
      // hacky but will revisit in the future
      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(this.updateDimensions, 100)
    }
  },

  render (h) {
    const data = {
      staticClass: 'v-menu',
      class: { 'v-menu--inline': !this.fullWidth && (this.$slots.activator || this.$scopedSlots.activator) },
      directives: [{
        arg: 500,
        name: 'resize',
        value: this.onResize
      }],
      on: this.disableKeys ? undefined : {
        keydown: this.onKeyDown
      }
    }

    return h('div', data, [
      this.genActivator(),
      this.$createElement(ThemeProvider, {
        props: {
          root: true,
          light: this.light,
          dark: this.dark
        }
      }, [this.genTransition()])
    ])
  }
})
