// Styles
import './VSlideGroup.sass'

// Components
import VIcon from '../VIcon'
import { VFadeTransition } from '../transitions'

// Extensions
import { BaseItemGroup } from '../VItemGroup/VItemGroup'

// Mixins
import Mobile from '../../mixins/mobile'

// Directives
import Resize from '../../directives/resize'
import Touch from '../../directives/touch'

// Utilities
import mixins, { ExtractVue } from '../../util/mixins'

// Types
import Vue, { VNode } from 'vue'

interface TouchEvent {
  touchstartX: number
  touchstartY: number
  touchmoveX: number
  touchmoveY: number
  stopPropagation: Function
}

interface Widths {
  content: number
  wrapper: number
}

interface options extends Vue {
  $refs: {
    content: HTMLElement
    wrapper: HTMLElement
  }
}

export const BaseSlideGroup = mixins<options &
/* eslint-disable indent */
  ExtractVue<[
    typeof BaseItemGroup,
    typeof Mobile,
  ]>
/* eslint-enable indent */
>(
  BaseItemGroup,
  Mobile,
  /* @vue/component */
).extend({
  name: 'base-slide-group',

  directives: {
    Resize,
    Touch,
  },

  props: {
    activeClass: {
      type: String,
      default: 'v-slide-item--active',
    },
    centerActive: Boolean,
    nextIcon: {
      type: String,
      default: '$next',
    },
    prevIcon: {
      type: String,
      default: '$prev',
    },
    showArrows: {
      type: [Boolean, String],
      validator: v => (
        typeof v === 'boolean' || [
          'always',
          'desktop',
          'mobile',
        ].includes(v)
      ),
    },
  },

  data: () => ({
    internalItemsLength: 0,
    isOverflowing: false,
    resizeTimeout: 0,
    startX: 0,
    isSwipingHorizontal: false,
    isSwiping: false,
    scrollOffset: 0,
    widths: {
      content: 0,
      wrapper: 0,
    },
  }),

  computed: {
    canTouch (): boolean {
      return typeof window !== 'undefined'
    },
    __cachedNext (): VNode {
      return this.genTransition('next')
    },
    __cachedPrev (): VNode {
      return this.genTransition('prev')
    },
    classes (): object {
      return {
        ...BaseItemGroup.options.computed.classes.call(this),
        'v-slide-group': true,
        'v-slide-group--has-affixes': this.hasAffixes,
        'v-slide-group--is-overflowing': this.isOverflowing,
      }
    },
    hasAffixes (): Boolean {
      switch (this.showArrows) {
        // Always show arrows on desktop & mobile
        case 'always': return true

        // Always show arrows on desktop
        case 'desktop': return !this.isMobile

        // Show arrows on mobile when overflowing.
        // This matches the default 2.2 behavior
        case true: return this.isOverflowing || Math.abs(this.scrollOffset) > 0

        // Always show on mobile
        case 'mobile': return (
          this.isMobile ||
          (this.isOverflowing || Math.abs(this.scrollOffset) > 0)
        )

        // https://material.io/components/tabs#scrollable-tabs
        // Always show arrows when
        // overflowed on desktop
        default: return (
          !this.isMobile &&
          (this.isOverflowing || Math.abs(this.scrollOffset) > 0)
        )
      }
    },
    hasNext (): boolean {
      if (!this.hasAffixes) return false

      const { content, wrapper } = this.widths

      // Check one scroll ahead to know the width of right-most item
      return content > Math.abs(this.scrollOffset) + wrapper
    },
    hasPrev (): boolean {
      return this.hasAffixes && this.scrollOffset !== 0
    },
  },

  watch: {
    internalValue: 'setWidths',
    // When overflow changes, the arrows alter
    // the widths of the content and wrapper
    // and need to be recalculated
    isOverflowing: 'setWidths',
    scrollOffset (val) {
      this.$refs.content.style.transform = `translateX(${-val}px)`
    },
  },

  beforeUpdate () {
    this.internalItemsLength = (this.$children || []).length
  },

  updated () {
    if (this.internalItemsLength === (this.$children || []).length) return
    this.setWidths()
  },

  methods: {
    // Always generate next for scrollable hint
    genNext (): VNode | null {
      const slot = this.$scopedSlots.next
        ? this.$scopedSlots.next({})
        : this.$slots.next || this.__cachedNext

      return this.$createElement('div', {
        staticClass: 'v-slide-group__next',
        class: {
          'v-slide-group__next--disabled': !this.hasNext,
        },
        on: {
          click: () => this.onAffixClick('next'),
        },
        key: 'next',
      }, [slot])
    },
    genContent (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-slide-group__content',
        ref: 'content',
      }, this.$slots.default)
    },
    genData (): object {
      return {
        class: this.classes,
        directives: [{
          name: 'resize',
          value: this.onResize,
        }],
      }
    },
    genIcon (location: 'prev' | 'next'): VNode | null {
      let icon = location

      if (this.$vuetify.rtl && location === 'prev') {
        icon = 'next'
      } else if (this.$vuetify.rtl && location === 'next') {
        icon = 'prev'
      }

      const upperLocation = `${location[0].toUpperCase()}${location.slice(1)}`
      const hasAffix = (this as any)[`has${upperLocation}`]

      if (
        !this.showArrows &&
        !hasAffix
      ) return null

      return this.$createElement(VIcon, {
        props: {
          disabled: !hasAffix,
        },
      }, (this as any)[`${icon}Icon`])
    },
    // Always generate prev for scrollable hint
    genPrev (): VNode | null {
      const slot = this.$scopedSlots.prev
        ? this.$scopedSlots.prev({})
        : this.$slots.prev || this.__cachedPrev

      return this.$createElement('div', {
        staticClass: 'v-slide-group__prev',
        class: {
          'v-slide-group__prev--disabled': !this.hasPrev,
        },
        on: {
          click: () => this.onAffixClick('prev'),
        },
        key: 'prev',
      }, [slot])
    },
    genTransition (location: 'prev' | 'next') {
      return this.$createElement(VFadeTransition, [this.genIcon(location)])
    },
    genWrapper (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-slide-group__wrapper',
        directives: [{
          name: 'touch',
          value: {
            start: (e: TouchEvent) => this.overflowCheck(e, this.onTouchStart),
            move: (e: TouchEvent) => this.overflowCheck(e, this.onTouchMove),
            end: (e: TouchEvent) => this.overflowCheck(e, this.onTouchEnd),
          },
        }],
        ref: 'wrapper',
      }, [this.genContent()])
    },
    calculateNewOffset (direction: 'prev' | 'next', widths: Widths, rtl: boolean, currentScrollOffset: number) {
      const sign = rtl ? -1 : 1
      const newAbosluteOffset = sign * currentScrollOffset +
        (direction === 'prev' ? -1 : 1) * widths.wrapper

      return sign * Math.max(Math.min(newAbosluteOffset, widths.content - widths.wrapper), 0)
    },
    onAffixClick (location: 'prev' | 'next') {
      this.$emit(`click:${location}`)
      this.scrollTo(location)
    },
    onResize () {
      /* istanbul ignore next */
      if (this._isDestroyed) return

      this.setWidths()
    },
    onTouchStart (e: TouchEvent) {
      const { content } = this.$refs

      this.startX = this.scrollOffset + e.touchstartX as number

      content.style.setProperty('transition', 'none')
      content.style.setProperty('willChange', 'transform')
    },
    onTouchMove (e: TouchEvent) {
      if (!this.canTouch) return

      if (!this.isSwiping) {
        // only calculate disableSwipeHorizontal during the first onTouchMove invoke
        // in order to ensure disableSwipeHorizontal value is consistent between onTouchStart and onTouchEnd
        const diffX = e.touchmoveX - e.touchstartX
        const diffY = e.touchmoveY - e.touchstartY
        this.isSwipingHorizontal = Math.abs(diffX) > Math.abs(diffY)
        this.isSwiping = true
      }

      if (this.isSwipingHorizontal) {
        // sliding horizontally
        this.scrollOffset = this.startX - e.touchmoveX
        // temporarily disable window vertical scrolling
        document.documentElement.style.overflowY = 'hidden'
      }
    },
    onTouchEnd () {
      if (!this.canTouch) return

      const { content, wrapper } = this.$refs
      const maxScrollOffset = content.clientWidth - wrapper.clientWidth

      content.style.setProperty('transition', null)
      content.style.setProperty('willChange', null)

      if (this.$vuetify.rtl) {
        /* istanbul ignore else */
        if (this.scrollOffset > 0 || !this.isOverflowing) {
          this.scrollOffset = 0
        } else if (this.scrollOffset <= -maxScrollOffset) {
          this.scrollOffset = -maxScrollOffset
        }
      } else {
        /* istanbul ignore else */
        if (this.scrollOffset < 0 || !this.isOverflowing) {
          this.scrollOffset = 0
        } else if (this.scrollOffset >= maxScrollOffset) {
          this.scrollOffset = maxScrollOffset
        }
      }

      this.isSwiping = false
      // rollback whole page scrolling to default
      document.documentElement.style.removeProperty('overflow-y')
    },
    overflowCheck (e: TouchEvent, fn: (e: TouchEvent) => void) {
      e.stopPropagation()
      this.isOverflowing && fn(e)
    },
    scrollIntoView /* istanbul ignore next */ () {
      if (!this.selectedItem && this.items.length) {
        const lastItemPosition = this.items[this.items.length - 1].$el.getBoundingClientRect()
        const wrapperPosition = this.$refs.wrapper.getBoundingClientRect()

        if (
          (this.$vuetify.rtl && wrapperPosition.right < lastItemPosition.right) ||
          (!this.$vuetify.rtl && wrapperPosition.left > lastItemPosition.left)
        ) {
          this.scrollTo('prev')
        }
      }

      if (!this.selectedItem) {
        return
      }

      if (
        this.selectedIndex === 0 ||
        (!this.centerActive && !this.isOverflowing)
      ) {
        this.scrollOffset = 0
      } else if (this.centerActive) {
        this.scrollOffset = this.calculateCenteredOffset(
          this.selectedItem.$el as HTMLElement,
          this.widths,
          this.$vuetify.rtl
        )
      } else if (this.isOverflowing) {
        this.scrollOffset = this.calculateUpdatedOffset(
          this.selectedItem.$el as HTMLElement,
          this.widths,
          this.$vuetify.rtl,
          this.scrollOffset
        )
      }
    },
    calculateUpdatedOffset (selectedElement: HTMLElement, widths: Widths, rtl: boolean, currentScrollOffset: number): number {
      const clientWidth = selectedElement.clientWidth
      const offsetLeft = rtl
        ? (widths.content - selectedElement.offsetLeft - clientWidth)
        : selectedElement.offsetLeft

      if (rtl) {
        currentScrollOffset = -currentScrollOffset
      }

      const totalWidth = widths.wrapper + currentScrollOffset
      const itemOffset = clientWidth + offsetLeft
      const additionalOffset = clientWidth * 0.4

      if (offsetLeft <= currentScrollOffset) {
        currentScrollOffset = Math.max(offsetLeft - additionalOffset, 0)
      } else if (totalWidth <= itemOffset) {
        currentScrollOffset = Math.min(currentScrollOffset - (totalWidth - itemOffset - additionalOffset), widths.content - widths.wrapper)
      }

      return rtl ? -currentScrollOffset : currentScrollOffset
    },
    calculateCenteredOffset (selectedElement: HTMLElement, widths: Widths, rtl: boolean): number {
      const { offsetLeft, clientWidth } = selectedElement

      if (rtl) {
        const offsetCentered = widths.content - offsetLeft - clientWidth / 2 - widths.wrapper / 2
        return -Math.min(widths.content - widths.wrapper, Math.max(0, offsetCentered))
      } else {
        const offsetCentered = offsetLeft + clientWidth / 2 - widths.wrapper / 2
        return Math.min(widths.content - widths.wrapper, Math.max(0, offsetCentered))
      }
    },
    scrollTo /* istanbul ignore next */ (location: 'prev' | 'next') {
      this.scrollOffset = this.calculateNewOffset(location, {
        // Force reflow
        content: this.$refs.content ? this.$refs.content.clientWidth : 0,
        wrapper: this.$refs.wrapper ? this.$refs.wrapper.clientWidth : 0,
      }, this.$vuetify.rtl, this.scrollOffset)
    },
    setWidths /* istanbul ignore next */  () {
      window.requestAnimationFrame(() => {
        const { content, wrapper } = this.$refs

        this.widths = {
          content: content ? content.clientWidth : 0,
          wrapper: wrapper ? wrapper.clientWidth : 0,
        }

        // https://github.com/vuetifyjs/vuetify/issues/13212
        // We add +1 to the wrappers width to prevent an issue where the `clientWidth`
        // gets calculated wrongly by the browser if using a different zoom-level.
        this.isOverflowing = this.widths.wrapper + 1 < this.widths.content

        this.scrollIntoView()
      })
    },
  },

  render (h): VNode {
    return h('div', this.genData(), [
      this.genPrev(),
      this.genWrapper(),
      this.genNext(),
    ])
  },
})

export default BaseSlideGroup.extend({
  name: 'v-slide-group',

  provide (): object {
    return {
      slideGroup: this,
    }
  },
})
