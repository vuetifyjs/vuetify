// Styles
import './VNavigationDrawer.sass'

// Components
import VImg, { srcObject } from '../VImg/VImg'

// Mixins
import Applicationable from '../../mixins/applicationable'
import Colorable from '../../mixins/colorable'
import Dependent from '../../mixins/dependent'
import Mobile from '../../mixins/mobile'
import Overlayable from '../../mixins/overlayable'
import SSRBootable from '../../mixins/ssr-bootable'
import Themeable from '../../mixins/themeable'

// Directives
import ClickOutside from '../../directives/click-outside'
import Resize from '../../directives/resize'
import Touch from '../../directives/touch'

// Utilities
import { convertToUnit, getSlot } from '../../util/helpers'
import mixins from '../../util/mixins'

// Types
import { VNode, VNodeDirective, PropType } from 'vue'
import { TouchWrapper } from 'vuetify/types'

const baseMixins = mixins(
  Applicationable('left', [
    'isActive',
    'isMobile',
    'miniVariant',
    'expandOnHover',
    'permanent',
    'right',
    'temporary',
    'width',
  ]),
  Colorable,
  Dependent,
  Mobile,
  Overlayable,
  SSRBootable,
  Themeable
)

/* @vue/component */
export default baseMixins.extend({
  name: 'v-navigation-drawer',

  directives: {
    ClickOutside,
    Resize,
    Touch,
  },

  provide (): object {
    return {
      isInNav: this.tag === 'nav',
    }
  },

  props: {
    bottom: Boolean,
    clipped: Boolean,
    disableResizeWatcher: Boolean,
    disableRouteWatcher: Boolean,
    expandOnHover: Boolean,
    floating: Boolean,
    height: {
      type: [Number, String],
      default (): string {
        return this.app ? '100vh' : '100%'
      },
    },
    miniVariant: Boolean,
    miniVariantWidth: {
      type: [Number, String],
      default: 56,
    },
    permanent: Boolean,
    right: Boolean,
    src: {
      type: [String, Object] as PropType<string | srcObject>,
      default: '',
    },
    stateless: Boolean,
    tag: {
      type: String,
      default (): string {
        return this.app ? 'nav' : 'aside'
      },
    },
    temporary: Boolean,
    touchless: Boolean,
    width: {
      type: [Number, String],
      default: 256,
    },
    value: null as unknown as PropType<any>,
  },

  data: () => ({
    isMouseover: false,
    touchArea: {
      left: 0,
      right: 0,
    },
    stackMinZIndex: 6,
  }),

  computed: {
    /**
     * Used for setting an app value from a dynamic
     * property. Called from applicationable.js
     */
    applicationProperty (): string {
      return this.right ? 'right' : 'left'
    },
    classes (): object {
      return {
        'v-navigation-drawer': true,
        'v-navigation-drawer--absolute': this.absolute,
        'v-navigation-drawer--bottom': this.bottom,
        'v-navigation-drawer--clipped': this.clipped,
        'v-navigation-drawer--close': !this.isActive,
        'v-navigation-drawer--fixed': !this.absolute && (this.app || this.fixed),
        'v-navigation-drawer--floating': this.floating,
        'v-navigation-drawer--is-mobile': this.isMobile,
        'v-navigation-drawer--is-mouseover': this.isMouseover,
        'v-navigation-drawer--mini-variant': this.isMiniVariant,
        'v-navigation-drawer--custom-mini-variant': Number(this.miniVariantWidth) !== 56,
        'v-navigation-drawer--open': this.isActive,
        'v-navigation-drawer--open-on-hover': this.expandOnHover,
        'v-navigation-drawer--right': this.right,
        'v-navigation-drawer--temporary': this.temporary,
        ...this.themeClasses,
      }
    },
    computedMaxHeight (): number | null {
      if (!this.hasApp) return null

      const computedMaxHeight = (
        this.$vuetify.application.bottom +
        this.$vuetify.application.footer +
        this.$vuetify.application.bar
      )

      if (!this.clipped) return computedMaxHeight

      return computedMaxHeight + this.$vuetify.application.top
    },
    computedTop (): number {
      if (!this.hasApp) return 0

      let computedTop = this.$vuetify.application.bar

      computedTop += this.clipped
        ? this.$vuetify.application.top
        : 0

      return computedTop
    },
    computedTransform (): number {
      if (this.isActive) return 0
      if (this.isBottom) return 100
      return this.right ? 100 : -100
    },
    computedWidth (): string | number {
      return this.isMiniVariant ? this.miniVariantWidth : this.width
    },
    hasApp (): boolean {
      return (
        this.app &&
        (!this.isMobile && !this.temporary)
      )
    },
    isBottom (): boolean {
      return this.bottom && this.isMobile
    },
    isMiniVariant (): boolean {
      return (
        !this.expandOnHover &&
        this.miniVariant
      ) || (
        this.expandOnHover &&
        !this.isMouseover
      )
    },
    isMobile (): boolean {
      return (
        !this.stateless &&
        !this.permanent &&
        Mobile.options.computed.isMobile.call(this)
      )
    },
    reactsToClick (): boolean {
      return (
        !this.stateless &&
        !this.permanent &&
        (this.isMobile || this.temporary)
      )
    },
    reactsToMobile (): boolean {
      return (
        this.app &&
        !this.disableResizeWatcher &&
        !this.permanent &&
        !this.stateless &&
        !this.temporary
      )
    },
    reactsToResize (): boolean {
      return !this.disableResizeWatcher && !this.stateless
    },
    reactsToRoute (): boolean {
      return (
        !this.disableRouteWatcher &&
        !this.stateless &&
        (this.temporary || this.isMobile)
      )
    },
    showOverlay (): boolean {
      return (
        !this.hideOverlay &&
        this.isActive &&
        (this.isMobile || this.temporary)
      )
    },
    styles (): object {
      const translate = this.isBottom ? 'translateY' : 'translateX'
      return {
        height: convertToUnit(this.height),
        top: !this.isBottom ? convertToUnit(this.computedTop) : 'auto',
        maxHeight: this.computedMaxHeight != null
          ? `calc(100% - ${convertToUnit(this.computedMaxHeight)})`
          : undefined,
        transform: `${translate}(${convertToUnit(this.computedTransform, '%')})`,
        width: convertToUnit(this.computedWidth),
      }
    },
  },

  watch: {
    $route: 'onRouteChange',
    isActive (val) {
      this.$emit('input', val)
    },
    /**
     * When mobile changes, adjust the active state
     * only when there has been a previous value
     */
    isMobile (val, prev) {
      !val &&
        this.isActive &&
        !this.temporary &&
        this.removeOverlay()

      if (prev == null ||
        !this.reactsToResize ||
        !this.reactsToMobile
      ) return

      this.isActive = !val
    },
    permanent (val) {
      // If enabling prop enable the drawer
      if (val) this.isActive = true
    },
    showOverlay (val) {
      if (val) this.genOverlay()
      else this.removeOverlay()
    },
    value (val) {
      if (this.permanent) return

      if (val == null) {
        this.init()
        return
      }

      if (val !== this.isActive) this.isActive = val
    },
    expandOnHover: 'updateMiniVariant',
    isMouseover (val) {
      this.updateMiniVariant(!val)
    },
  },

  beforeMount () {
    this.init()
  },

  methods: {
    calculateTouchArea () {
      const parent = this.$el.parentNode as Element

      if (!parent) return

      const parentRect = parent.getBoundingClientRect()

      this.touchArea = {
        left: parentRect.left + 50,
        right: parentRect.right - 50,
      }
    },
    closeConditional () {
      return this.isActive && !this._isDestroyed && this.reactsToClick
    },
    genAppend () {
      return this.genPosition('append')
    },
    genBackground () {
      const props = {
        height: '100%',
        width: '100%',
        src: this.src,
      }

      const image = this.$scopedSlots.img
        ? this.$scopedSlots.img(props)
        : this.$createElement(VImg, { props })

      return this.$createElement('div', {
        staticClass: 'v-navigation-drawer__image',
      }, [image])
    },
    genDirectives (): VNodeDirective[] {
      const directives = [{
        name: 'click-outside',
        value: {
          handler: () => { this.isActive = false },
          closeConditional: this.closeConditional,
          include: this.getOpenDependentElements,
        },
      }]

      if (!this.touchless && !this.stateless) {
        directives.push({
          name: 'touch',
          value: {
            parent: true,
            left: this.swipeLeft,
            right: this.swipeRight,
          },
        } as any)
      }

      return directives
    },
    genListeners () {
      const on: Record<string, (e: Event) => void> = {
        mouseenter: () => (this.isMouseover = true),
        mouseleave: () => (this.isMouseover = false),
        transitionend: (e: Event) => {
          if (e.target !== e.currentTarget) return
          this.$emit('transitionend', e)

          // IE11 does not support new Event('resize')
          const resizeEvent = document.createEvent('UIEvents')
          resizeEvent.initUIEvent('resize', true, false, window, 0)
          window.dispatchEvent(resizeEvent)
        },
      }

      if (this.miniVariant) {
        on.click = () => this.$emit('update:mini-variant', false)
      }

      return on
    },
    genPosition (name: 'prepend' | 'append') {
      const slot = getSlot(this, name)

      if (!slot) return slot

      return this.$createElement('div', {
        staticClass: `v-navigation-drawer__${name}`,
      }, slot)
    },
    genPrepend () {
      return this.genPosition('prepend')
    },
    genContent () {
      return this.$createElement('div', {
        staticClass: 'v-navigation-drawer__content',
      }, getSlot(this))
    },
    genBorder () {
      return this.$createElement('div', {
        staticClass: 'v-navigation-drawer__border',
      })
    },
    init () {
      if (this.permanent) {
        this.isActive = true
      } else if (this.stateless ||
        this.value != null
      ) {
        this.isActive = this.value
      } else if (!this.temporary) {
        this.isActive = !this.isMobile
      }
    },
    onRouteChange () {
      if (this.reactsToRoute && this.closeConditional()) {
        this.isActive = false
      }
    },
    swipeLeft (e: TouchWrapper) {
      if (this.isActive && this.right) return
      this.calculateTouchArea()

      if (Math.abs(e.touchendX - e.touchstartX) < 100) return
      if (this.right &&
        e.touchstartX >= this.touchArea.right
      ) this.isActive = true
      else if (!this.right && this.isActive) this.isActive = false
    },
    swipeRight (e: TouchWrapper) {
      if (this.isActive && !this.right) return
      this.calculateTouchArea()

      if (Math.abs(e.touchendX - e.touchstartX) < 100) return
      if (!this.right &&
        e.touchstartX <= this.touchArea.left
      ) this.isActive = true
      else if (this.right && this.isActive) this.isActive = false
    },
    /**
     * Update the application layout
     */
    updateApplication () {
      if (
        !this.isActive ||
        this.isMobile ||
        this.temporary ||
        !this.$el
      ) return 0

      const width = Number(this.miniVariant ? this.miniVariantWidth : this.width)

      return isNaN(width) ? this.$el.clientWidth : width
    },
    updateMiniVariant (val: boolean) {
      if (this.expandOnHover && this.miniVariant !== val) this.$emit('update:mini-variant', val)
    },
  },

  render (h): VNode {
    const children = [
      this.genPrepend(),
      this.genContent(),
      this.genAppend(),
      this.genBorder(),
    ]

    if (this.src || getSlot(this, 'img')) children.unshift(this.genBackground())

    return h(this.tag, this.setBackgroundColor(this.color, {
      class: this.classes,
      style: this.styles,
      directives: this.genDirectives(),
      on: this.genListeners(),
    }), children)
  },
})
