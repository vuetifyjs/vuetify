// Styles
import './VNavigationDrawer.sass'

// Mixins
import Applicationable from '../../mixins/applicationable'
import Colorable from '../../mixins/colorable'
import Dependent from '../../mixins/dependent'
import Overlayable from '../../mixins/overlayable'
import SSRBootable from '../../mixins/ssr-bootable'
import Themeable from '../../mixins/themeable'

// Directives
import ClickOutside from '../../directives/click-outside'
import Resize from '../../directives/resize'
import Touch, { TouchWrapper } from '../../directives/touch'

// Utilities
import { convertToUnit, getSlot } from '../../util/helpers'
import mixins from '../../util/mixins'

// TYpes
import { VNode } from 'vue/types/vnode'
import { PropValidator } from 'vue/types/options'

const baseMixins = mixins(
  Applicationable('left', [
    'miniVariant',
    'right',
    'width'
  ]),
  Colorable,
  Dependent,
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
    Touch
  },

  props: {
    clipped: Boolean,
    disableRouteWatcher: Boolean,
    disableResizeWatcher: Boolean,
    height: {
      type: [Number, String],
      default: '100vh'
    },
    floating: Boolean,
    miniVariant: Boolean,
    miniVariantWidth: {
      type: [Number, String],
      default: 80
    },
    mobileBreakPoint: {
      type: [Number, String],
      default: 1264
    },
    permanent: Boolean,
    right: Boolean,
    stateless: Boolean,
    temporary: Boolean,
    touchless: Boolean,
    width: {
      type: [Number, String],
      default: 256
    },
    value: { required: false } as PropValidator<any>
  },

  data: () => ({
    isActive: false,
    touchArea: {
      left: 0,
      right: 0
    }
  }),

  computed: {
    /**
     * Used for setting an app value from a dynamic
     * property. Called from applicationable.js
     */
    applicationProperty (): string {
      return this.right ? 'right' : 'left'
    },
    calculatedTransform (): number {
      if (this.isActive) return 0

      return this.right ? 100 : -100
    },
    classes (): object {
      return {
        'v-navigation-drawer': true,
        'v-navigation-drawer--absolute': this.absolute,
        'v-navigation-drawer--clipped': this.clipped,
        'v-navigation-drawer--close': !this.isActive,
        'v-navigation-drawer--fixed': !this.absolute && (this.app || this.fixed),
        'v-navigation-drawer--floating': this.floating,
        'v-navigation-drawer--is-mobile': this.isMobile,
        'v-navigation-drawer--mini-variant': this.miniVariant,
        'v-navigation-drawer--open': this.isActive,
        'v-navigation-drawer--right': this.right,
        'v-navigation-drawer--temporary': this.temporary,
        ...this.themeClasses
      }
    },
    hasApp (): boolean {
      return this.app &&
        (!this.isMobile && !this.temporary)
    },
    isMobile (): boolean {
      return (
        !this.stateless &&
        !this.permanent &&
        !this.temporary &&
        this.$vuetify.breakpoint.width < parseInt(this.mobileBreakPoint, 10)
      )
    },
    marginTop (): number {
      if (!this.hasApp) return 0

      let marginTop = this.$vuetify.application.bar

      marginTop += this.clipped
        ? this.$vuetify.application.top
        : 0

      return marginTop
    },
    maxHeight (): number | null {
      if (!this.hasApp) return null

      const maxHeight = (
        this.$vuetify.application.bottom +
        this.$vuetify.application.footer +
        this.$vuetify.application.bar
      )

      if (!this.clipped) return maxHeight

      return maxHeight + this.$vuetify.application.top
    },
    reactsToClick (): boolean {
      return !this.stateless &&
        !this.permanent &&
        (this.isMobile || this.temporary)
    },
    reactsToMobile (): boolean {
      return !this.disableResizeWatcher &&
        !this.stateless &&
        !this.permanent &&
        !this.temporary
    },
    reactsToResize (): boolean {
      return !this.disableResizeWatcher && !this.stateless
    },
    reactsToRoute (): boolean {
      return !this.disableRouteWatcher &&
        !this.stateless &&
        (this.temporary || this.isMobile)
    },
    showOverlay (): boolean {
      return this.isActive &&
        (this.isMobile || this.temporary)
    },
    styles (): object {
      const styles = {
        height: convertToUnit(this.height),
        marginTop: convertToUnit(this.marginTop),
        maxHeight: this.maxHeight != null ? `calc(100% - ${convertToUnit(this.maxHeight)})` : undefined,
        transform: `translateX(${convertToUnit(this.calculatedTransform, '%')})`,
        width: convertToUnit(this.width)
      }

      return styles
    }
  },

  watch: {
    $route () {
      if (this.reactsToRoute && this.closeConditional()) {
        this.isActive = false
      }
    },
    isActive (val) {
      this.$emit('input', val)
      this.callUpdate()
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
      this.callUpdate()
    },
    permanent (val) {
      // If enabling prop enable the drawer
      if (val) {
        this.isActive = true
      }
      this.callUpdate()
    },
    showOverlay (val) {
      if (val) this.genOverlay()
      else this.removeOverlay()
    },
    temporary () {
      this.callUpdate()
    },
    value (val) {
      if (this.permanent) return

      // TODO: referring to this directly causes type errors
      // all over the place for some reason
      const _this = this as any
      if (val == null) return _this.init()

      if (val !== this.isActive) this.isActive = val
    }
  },

  beforeMount () {
    this.init()
  },

  methods: {
    calculateTouchArea () {
      if (!this.$el.parentNode) return
      const parentRect = (this.$el.parentNode as Element).getBoundingClientRect()

      this.touchArea = {
        left: parentRect.left + 50,
        right: parentRect.right - 50
      }
    },
    closeConditional () {
      return this.isActive && this.reactsToClick
    },
    genDirectives () {
      const directives = [{
        name: 'click-outside',
        value: () => (this.isActive = false),
        args: {
          closeConditional: this.closeConditional,
          include: this.getOpenDependentElements
        }
      }]

      !this.touchless && directives.push({
        name: 'touch',
        value: {
          parent: true,
          left: this.swipeLeft,
          right: this.swipeRight
        }
      } as any)

      return directives
    },
    genAppend () {
      const slot = getSlot(this, 'append')

      if (!slot) return slot

      return this.$createElement('div', {
        staticClass: 'v-navigation-drawer__append'
      }, slot)
    },
    genPrepend () {
      const slot = getSlot(this, 'prepend')

      if (!slot) return slot

      return this.$createElement('div', {
        staticClass: 'v-navigation-drawer__prepend'
      }, slot)
    },
    genContent () {
      return this.$createElement('div', {
        staticClass: 'v-navigation-drawer__content'
      }, this.$slots.default)
    },
    genBorder () {
      return this.$createElement('div', {
        staticClass: 'v-navigation-drawer__border'
      })
    },
    /**
     * Sets state before mount to avoid
     * entry transitions in SSR
     */
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
    swipeRight (e: TouchWrapper) {
      if (this.isActive && !this.right) return
      this.calculateTouchArea()

      if (Math.abs(e.touchendX - e.touchstartX) < 100) return
      if (!this.right &&
        e.touchstartX <= this.touchArea.left
      ) this.isActive = true
      else if (this.right && this.isActive) this.isActive = false
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
    /**
     * Update the application layout
     */
    updateApplication () {
      if (
        !this.isActive ||
        this.temporary ||
        this.isMobile ||
        !this.$el
      ) return 0

      return this.$el.clientWidth
    }
  },

  render (h): VNode {
    return h('aside', this.setBackgroundColor(this.color, {
      class: this.classes,
      style: this.styles,
      directives: this.genDirectives(),
      on: {
        click: () => {
          if (!this.miniVariant) return

          this.$emit('update:miniVariant', false)
        },
        transitionend: (e: Event) => {
          if (e.target !== e.currentTarget) return
          this.$emit('transitionend', e)

          // IE11 does not support new Event('resize')
          const resizeEvent = document.createEvent('UIEvents')
          resizeEvent.initUIEvent('resize', true, false, window, 0)
          window.dispatchEvent(resizeEvent)
        }
      }
    }), [
      this.genPrepend(),
      this.genContent(),
      this.genAppend(),
      this.genBorder()
    ])
  }
})
