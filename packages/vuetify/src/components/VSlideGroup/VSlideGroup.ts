// Styles
import './VSlideGroup.sass'

// Components
import VIcon from '../VIcon'
import { VFadeTransition } from '../transitions'

// Extensions
import { BaseItemGroup } from '../VItemGroup/VItemGroup'

// Directives
import Resize from '../../directives/resize'
import Touch from '../../directives/touch'

// Utilities
import mixins, { ExtractVue } from '../../util/mixins'

// Types
import Vue, { VNode } from 'vue'

interface TouchEvent {
  touchstartX: number
  touchmoveX: number
}

interface options extends Vue {
  $refs: {
    content: HTMLElement
    wrapper: HTMLElement
  }
}

export const BaseSlideGroup = mixins<options &
/* eslint-disable indent */
  ExtractVue<typeof BaseItemGroup>
/* eslint-enable indent */
>(
  BaseItemGroup
  /* @vue/component */
).extend({
  name: 'base-slide-group',

  directives: {
    Resize,
    Touch
  },

  props: {
    activeClass: {
      type: String,
      default: 'v-slide-item--active'
    },
    appendIcon: {
      type: String,
      default: '$vuetify.icons.next'
    },
    mobileBreakPoint: {
      type: [Number, String],
      default: 1264,
      validator: (v: any) => !isNaN(parseInt(v))
    },
    prependIcon: {
      type: String,
      default: '$vuetify.icons.prev'
    },
    showArrows: Boolean
  },

  data: () => ({
    isOverflowing: false,
    resizeTimeout: 0,
    startX: 0,
    scrollOffset: 0,
    widths: {
      content: 0,
      wrapper: 0
    }
  }),

  computed: {
    __cachedAppend (): VNode {
      return this.genTransition('append')
    },
    __cachedPrepend (): VNode {
      return this.genTransition('prepend')
    },
    classes (): object {
      return BaseItemGroup.options.computed.classes.call(this)
    },
    hasAffixes (): Boolean {
      return (
        (this.showArrows || !this.isMobile) &&
        this.isOverflowing
      )
    },
    hasAppend (): boolean {
      if (!this.hasAffixes) return false

      const { content, wrapper } = this.widths

      // Check one scroll ahead to know the width of right-most item
      return content > this.scrollOffset + wrapper
    },
    hasPrepend (): boolean {
      return this.hasAffixes && this.scrollOffset > 0
    },
    isMobile (): boolean {
      return this.$vuetify.breakpoint.width < this.mobileBreakPoint
    }
  },

  watch: {
    scrollOffset (val) {
      this.$refs.content.style.transform = `translateX(${-val}px)`
    },
    widths: 'setOverflow'
  },

  methods: {
    genAppend (): VNode | null {
      if (!this.isOverflowing && !this.showArrows) return null

      const slot = this.$scopedSlots.append
        ? this.$scopedSlots.append({})
        : this.$slots.append || this.__cachedAppend

      return this.$createElement('div', {
        staticClass: 'v-slide-group__append',
        class: {
          'v-slide-group__append--disabled': !this.hasAppend
        },
        on: {
          click: () => this.onAffixClick('append')
        },
        key: 'append'
      }, [slot])
    },
    genContent (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-slide-group__content',
        ref: 'content'
      }, this.$slots.default)
    },
    genIcon (location: 'prepend' | 'append'): VNode | null {
      const upperLocation = `${location[0].toUpperCase()}${location.slice(1)}`
      const hasAffix = (this as any)[`has${upperLocation}`]

      if (
        !this.showArrows &&
        !hasAffix
      ) return null

      return this.$createElement(VIcon, {
        props: {
          disabled: !hasAffix
        }
      }, (this as any)[`${location}Icon`])
    },
    genPrepend (): VNode | null {
      if (!this.isOverflowing && !this.showArrows) return null

      const slot = this.$scopedSlots.prepend
        ? this.$scopedSlots.prepend({})
        : this.$slots.prepend || this.__cachedPrepend

      return this.$createElement('div', {
        staticClass: 'v-slide-group__prepend',
        class: {
          'v-slide-group__prepend--disabled': !this.hasPrepend
        },
        on: {
          click: () => this.onAffixClick('prepend')
        },
        key: 'prepend'
      }, [slot])
    },
    genTransition (location: 'prepend' | 'append') {
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
            end: (e: TouchEvent) => this.overflowCheck(e, this.onTouchEnd)
          }
        }],
        ref: 'wrapper'
      }, [this.genContent()])
    },
    newOffset /* istanbul ignore next */ (direction: 'prepend' | 'append') {
      // Force reflow
      const clientWidth = this.$refs.wrapper.clientWidth

      if (direction === 'prepend') {
        return Math.max(this.scrollOffset - clientWidth, 0)
      }

      return Math.min(
        this.scrollOffset + clientWidth,
        this.$refs.content.clientWidth - clientWidth
      )
    },
    onAffixClick (location: 'prepend' | 'append') {
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
      this.scrollOffset = this.startX - e.touchmoveX
    },
    onTouchEnd () {
      const { content, wrapper } = this.$refs
      const maxScrollOffset = content.clientWidth - wrapper.clientWidth

      content.style.setProperty('transition', null)
      content.style.setProperty('willChange', null)

      /* istanbul ignore else */
      if (this.scrollOffset < 0 || !this.isOverflowing) {
        this.scrollOffset = 0
      } else if (this.scrollOffset >= maxScrollOffset) {
        this.scrollOffset = maxScrollOffset
      }
    },
    overflowCheck (e: TouchEvent, fn: (e: TouchEvent) => void) {
      this.isOverflowing && fn(e)
    },
    scrollTo /* istanbul ignore next */ (location: 'prepend' | 'append') {
      this.scrollOffset = this.newOffset(location)
    },
    setOverflow () {
      this.isOverflowing = this.widths.wrapper < this.widths.content
    },
    setWidths () {
      const { content, wrapper } = this.$refs

      this.widths = {
        content: content ? content.clientWidth : 0,
        wrapper: wrapper ? wrapper.clientWidth : 0
      }
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-item-group v-slide-group',
      class: this.classes,
      directives: [{
        name: 'resize',
        value: this.onResize
      }]
    }, [
      this.genPrepend(),
      this.genWrapper(),
      this.genAppend()
    ])
  }
})

export default BaseSlideGroup.extend({
  name: 'v-slide-group',

  provide (): object {
    return {
      slideGroup: this
    }
  }
})
