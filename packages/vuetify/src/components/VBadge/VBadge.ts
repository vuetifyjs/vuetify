// Styles
import './VBadge.sass'

// Components
import VIcon from '../VIcon/VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import Toggleable from '../../mixins/toggleable'
import Transitionable from '../../mixins/transitionable'
import { factory as PositionableFactory } from '../../mixins/positionable'

// Utilities
import mixins from '../../util/mixins'
import {
  convertToUnit,
  getSlot,
} from '../../util/helpers'

// Types
import { VNode } from 'vue'

export default mixins(
  Colorable,
  PositionableFactory(['left', 'bottom']),
  Themeable,
  Toggleable,
  Transitionable,
/* @vue/component */
).extend({
  name: 'v-badge',

  props: {
    avatar: Boolean,
    bordered: Boolean,
    color: {
      type: String,
      default: 'primary',
    },
    content: { required: false },
    dot: Boolean,
    label: {
      type: String,
      default: '$vuetify.badge',
    },
    icon: String,
    inline: Boolean,
    offsetX: [Number, String],
    offsetY: [Number, String],
    overlap: Boolean,
    tile: Boolean,
    transition: {
      type: String,
      default: 'scale-rotate-transition',
    },
    value: { default: true },
  },

  computed: {
    classes (): object {
      return {
        'v-badge--avatar': this.avatar,
        'v-badge--bordered': this.bordered,
        'v-badge--bottom': this.bottom,
        'v-badge--dot': this.dot,
        'v-badge--icon': this.icon != null,
        'v-badge--inline': this.inline,
        'v-badge--left': this.left,
        'v-badge--overlap': this.overlap,
        'v-badge--tile': this.tile,
        ...this.themeClasses,
      }
    },
    computedBottom (): string {
      return this.bottom ? 'auto' : this.computedYOffset
    },
    computedLeft (): string {
      if (this.isRtl) {
        return this.left ? this.computedXOffset : 'auto'
      }

      return this.left ? 'auto' : this.computedXOffset
    },
    computedRight (): string {
      if (this.isRtl) {
        return this.left ? 'auto' : this.computedXOffset
      }

      return !this.left ? 'auto' : this.computedXOffset
    },
    computedTop (): string {
      return this.bottom ? this.computedYOffset : 'auto'
    },
    computedXOffset (): string {
      return this.calcPosition(this.offsetX)
    },
    computedYOffset (): string {
      return this.calcPosition(this.offsetY)
    },
    isRtl (): boolean {
      return this.$vuetify.rtl
    },
    // Default fallback if offsetX
    // or offsetY are undefined.
    offset (): number {
      if (this.overlap) return this.dot ? 8 : 12
      return this.dot ? 2 : 4
    },
    styles (): object {
      if (this.inline) return {}

      return {
        bottom: this.computedBottom,
        left: this.computedLeft,
        right: this.computedRight,
        top: this.computedTop,
      }
    },
  },

  methods: {
    calcPosition (offset: string | number): string {
      return `calc(100% - ${convertToUnit(offset || this.offset)})`
    },
    genBadge () {
      const lang = this.$vuetify.lang
      const label = this.$attrs['aria-label'] || lang.t(this.label)

      const data = this.setBackgroundColor(this.color, {
        staticClass: 'v-badge__badge',
        style: this.styles,
        attrs: {
          'aria-atomic': this.$attrs['aria-atomic'] || 'true',
          'aria-label': label,
          'aria-live': this.$attrs['aria-live'] || 'polite',
          title: this.$attrs.title,
          role: this.$attrs.role || 'status',
        },
        directives: [{
          name: 'show',
          value: this.isActive,
        }],
      })

      const badge = this.$createElement('span', data, [this.genBadgeContent()])

      if (!this.transition) return badge

      return this.$createElement('transition', {
        props: {
          name: this.transition,
          origin: this.origin,
          mode: this.mode,
        },
      }, [badge])
    },
    genBadgeContent () {
      // Dot prop shows no content
      if (this.dot) return undefined

      const slot = getSlot(this, 'badge')

      if (slot) return slot
      if (this.content) return String(this.content)
      if (this.icon) return this.$createElement(VIcon, this.icon)

      return undefined
    },
    genBadgeWrapper () {
      return this.$createElement('span', {
        staticClass: 'v-badge__wrapper',
      }, [this.genBadge()])
    },
  },

  render (h): VNode {
    const badge = [this.genBadgeWrapper()]
    const children = [getSlot(this)]
    const {
      'aria-atomic': _x,
      'aria-label': _y,
      'aria-live': _z,
      role,
      title,
      ...attrs
    } = this.$attrs

    if (this.inline && this.left) children.unshift(badge)
    else children.push(badge)

    return h('span', {
      staticClass: 'v-badge',
      attrs,
      class: this.classes,
    }, children)
  },
})
