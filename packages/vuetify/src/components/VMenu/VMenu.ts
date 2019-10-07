// Styles
import './VMenu.sass'

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

// Utilities
import mixins from '../../util/mixins'
import { convertToUnit, keyCodes } from '../../util/helpers'
import ThemeProvider from '../../util/ThemeProvider'
import { removed } from '../../util/console'

// Types
import { VNode, VNodeDirective, VNodeData } from 'vue'

const baseMixins = mixins(
  Dependent,
  Delayable,
  Detachable,
  Menuable,
  Returnable,
  Toggleable,
  Themeable
)

/* @vue/component */
export default baseMixins.extend({
  name: 'v-menu',

  provide (): object {
    return {
      isInMenu: true,
      // Pass theme through to default slot
      theme: this.theme,
    }
  },

  directives: {
    ClickOutside,
    Resize,
  },

  props: {
    auto: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    closeOnContentClick: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean,
    disableKeys: Boolean,
    maxHeight: {
      type: [Number, String],
      default: 'auto',
    },
    offsetX: Boolean,
    offsetY: Boolean,
    openOnClick: {
      type: Boolean,
      default: true,
    },
    openOnHover: Boolean,
    origin: {
      type: String,
      default: 'top left',
    },
    transition: {
      type: [Boolean, String],
      default: 'v-menu-transition',
    },
  },

  data () {
    return {
      calculatedTopAuto: 0,
      defaultOffset: 8,
      hasJustFocused: false,
      listIndex: -1,
      resizeTimeout: 0,
      selectedIndex: null as null | number,
      tiles: [] as HTMLElement[],
    }
  },

  computed: {
    activeTile (): HTMLElement | undefined {
      return this.tiles[this.listIndex]
    },
    calculatedLeft (): string {
      const menuWidth = Math.max(this.dimensions.content.width, parseFloat(this.calculatedMinWidth))

      if (!this.auto) return this.calcLeft(menuWidth) || '0'

      return convertToUnit(this.calcXOverflow(this.calcLeftAuto(), menuWidth)) || '0'
    },
    calculatedMaxHeight (): string {
      const height = this.auto
        ? '200px'
        : convertToUnit(this.maxHeight)

      return height || '0'
    },
    calculatedMaxWidth (): string {
      return convertToUnit(this.maxWidth) || '0'
    },
    calculatedMinWidth (): string {
      if (this.minWidth) {
        return convertToUnit(this.minWidth) || '0'
      }

      const minWidth = Math.min(
        this.dimensions.activator.width +
        Number(this.nudgeWidth) +
        (this.auto ? 16 : 0),
        Math.max(this.pageWidth - 24, 0)
      )

      const calculatedMaxWidth = isNaN(parseInt(this.calculatedMaxWidth))
        ? minWidth
        : parseInt(this.calculatedMaxWidth)

      return convertToUnit(Math.min(
        calculatedMaxWidth,
        minWidth
      )) || '0'
    },
    calculatedTop (): string {
      const top = !this.auto
        ? this.calcTop()
        : convertToUnit(this.calcYOverflow(this.calculatedTopAuto))

      return top || '0'
    },
    hasClickableTiles (): boolean {
      return Boolean(this.tiles.find(tile => tile.tabIndex > -1))
    },
    styles (): object {
      return {
        maxHeight: this.calculatedMaxHeight,
        minWidth: this.calculatedMinWidth,
        maxWidth: this.calculatedMaxWidth,
        top: this.calculatedTop,
        left: this.calculatedLeft,
        transformOrigin: this.origin,
        zIndex: this.zIndex || this.activeZIndex,
      }
    },
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
    },
  },

  created () {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('full-width')) {
      removed('full-width', this)
    }
  },

  mounted () {
    this.isActive && this.callActivate()
  },

  methods: {
    activate () {
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
      const activeTile = $el.querySelector('.v-list-item--active') as HTMLElement
      const maxScrollTop = $el.scrollHeight - $el.offsetHeight

      return activeTile
        ? Math.min(maxScrollTop, Math.max(0, activeTile.offsetTop - $el.offsetHeight / 2 + activeTile.offsetHeight / 2))
        : $el.scrollTop
    },
    calcLeftAuto () {
      return parseInt(this.dimensions.activator.left - this.defaultOffset * 2)
    },
    calcTopAuto () {
      const $el = this.$refs.content
      const activeTile = $el.querySelector('.v-list-item--active') as HTMLElement | null

      if (!activeTile) {
        this.selectedIndex = null
      }

      if (this.offsetY || !activeTile) {
        return this.computedTop
      }

      this.selectedIndex = Array.from(this.tiles).indexOf(activeTile)

      const tileDistanceFromMenuTop = activeTile.offsetTop - this.calcScrollPosition()
      const firstTileOffsetTop = ($el.querySelector('.v-list-item') as HTMLElement).offsetTop

      return this.computedTop - tileDistanceFromMenuTop - firstTileOffsetTop - 1
    },
    changeListIndex (e: KeyboardEvent) {
      // For infinite scroll and autocomplete, re-evaluate children
      this.getTiles()

      if (!this.isActive || !this.hasClickableTiles) {
        return
      } else if (e.keyCode === keyCodes.tab) {
        this.isActive = false
        return
      } else if (e.keyCode === keyCodes.down) {
        this.nextTile()
      } else if (e.keyCode === keyCodes.up) {
        this.prevTile()
      } else if (e.keyCode === keyCodes.enter && this.listIndex !== -1) {
        this.tiles[this.listIndex].click()
      } else { return }
      // One of the conditions was met, prevent default action (#2988)
      e.preventDefault()
    },
    closeConditional (e: Event) {
      const target = e.target as HTMLElement

      return this.isActive &&
        !this._isDestroyed &&
        this.closeOnClick &&
        !this.$refs.content.contains(target)
    },
    genActivatorListeners () {
      const listeners = Menuable.options.methods.genActivatorListeners.call(this)

      if (!this.disableKeys) {
        listeners.keydown = this.onKeyDown
      }

      return listeners
    },
    genTransition (): VNode {
      if (!this.transition) return this.genContent()

      return this.$createElement('transition', {
        props: {
          name: this.transition,
        },
      }, [this.genContent()])
    },
    genDirectives (): VNodeDirective[] {
      const directives: VNodeDirective[] = [{
        name: 'show',
        value: this.isContentActive,
      }]

      // Do not add click outside for hover menu
      if (!this.openOnHover && this.closeOnClick) {
        directives.push({
          name: 'click-outside',
          value: () => { this.isActive = false },
          args: {
            closeConditional: this.closeConditional,
            include: () => [this.$el, ...this.getOpenDependentElements()],
          },
        } as any)
      }

      return directives
    },
    genContent (): VNode {
      const options = {
        attrs: {
          ...this.getScopeIdAttrs(),
          role: 'role' in this.$attrs ? this.$attrs.role : 'menu',
        },
        staticClass: 'v-menu__content',
        class: {
          ...this.rootThemeClasses,
          'v-menu__content--auto': this.auto,
          'v-menu__content--fixed': this.activatorFixed,
          menuable__content__active: this.isActive,
          [this.contentClass.trim()]: true,
        },
        style: this.styles,
        directives: this.genDirectives(),
        ref: 'content',
        on: {
          click: (e: Event) => {
            e.stopPropagation()

            const target = e.target as HTMLElement

            if (target.getAttribute('disabled')) return
            if (this.closeOnContentClick) this.isActive = false
          },
          keydown: this.onKeyDown,
        },
      } as VNodeData

      if (!this.disabled && this.openOnHover) {
        options.on = options.on || {}
        options.on.mouseenter = this.mouseEnterHandler
      }

      if (this.openOnHover) {
        options.on = options.on || {}
        options.on.mouseleave = this.mouseLeaveHandler
      }

      return this.$createElement(
        'div',
        options,
        this.showLazyContent(this.getContentSlot())
      )
    },
    getTiles () {
      this.tiles = Array.from(this.$refs.content.querySelectorAll('.v-list-item'))
    },
    mouseEnterHandler () {
      this.runDelay('open', () => {
        if (this.hasJustFocused) return

        this.hasJustFocused = true
        this.isActive = true
      })
    },
    mouseLeaveHandler (e: MouseEvent) {
      // Prevent accidental re-activation
      this.runDelay('close', () => {
        if (this.$refs.content.contains(e.relatedTarget as HTMLElement)) return

        requestAnimationFrame(() => {
          this.isActive = false
          this.callDeactivate()
        })
      })
    },
    nextTile () {
      const tile = this.tiles[this.listIndex + 1]

      if (!tile) {
        if (!this.tiles.length) return

        this.listIndex = -1
        this.nextTile()

        return
      }

      this.listIndex++
      if (tile.tabIndex === -1) this.nextTile()
    },
    prevTile () {
      const tile = this.tiles[this.listIndex - 1]

      if (!tile) {
        if (!this.tiles.length) return

        this.listIndex = this.tiles.length
        this.prevTile()

        return
      }

      this.listIndex--
      if (tile.tabIndex === -1) this.prevTile()
    },
    onKeyDown (e: KeyboardEvent) {
      if (e.keyCode === keyCodes.esc) {
        // Wait for dependent elements to close first
        setTimeout(() => { this.isActive = false })
        const activator = this.getActivator()
        this.$nextTick(() => activator && activator.focus())
      } else if (
        !this.isActive &&
        [keyCodes.up, keyCodes.down].includes(e.keyCode)
      ) {
        this.isActive = true
      }

      // Allow for isActive watcher to generate tile list
      this.$nextTick(() => this.changeListIndex(e))
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
      this.resizeTimeout = window.setTimeout(this.updateDimensions, 100)
    },
  },

  render (h): VNode {
    const data = {
      staticClass: 'v-menu',
      class: {
        'v-menu--attached':
          this.attach === '' ||
          this.attach === true ||
          this.attach === 'attach',
      },
      directives: [{
        arg: '500',
        name: 'resize',
        value: this.onResize,
      }],
    }

    return h('div', data, [
      !this.activator && this.genActivator(),
      this.$createElement(ThemeProvider, {
        props: {
          root: true,
          light: this.light,
          dark: this.dark,
        },
      }, [this.genTransition()]),
    ])
  },
})
