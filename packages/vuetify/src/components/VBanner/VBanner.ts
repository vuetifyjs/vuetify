// Styles
import './VBanner.sass'

// Extensions
import VSheet from '../VSheet'

// Components
import VAvatar from '../VAvatar'
import VIcon from '../VIcon'
import { VExpandTransition } from '../transitions'

// Mixins
import Toggleable from '../../mixins/toggleable'

// Types
import { VNode } from 'vue/types'
import mixins from '../../util/mixins'
import { PropValidator } from 'vue/types/options'

/* @vue/component */
export default mixins(
  VSheet,
  Toggleable
).extend({
  name: 'v-banner',

  inheritAttrs: false,

  props: {
    icon: String,
    iconColor: String,
    mobileBreakPoint: {
      type: [Number, String],
      default: 960,
    } as PropValidator<string | number>,
    singleLine: Boolean,
    sticky: Boolean,
    tile: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    classes (): object {
      return {
        ...VSheet.options.computed.classes.call(this),
        'v-banner--has-icon': this.hasIcon,
        'v-banner--is-mobile': this.isMobile,
        'v-banner--single-line': this.singleLine,
        'v-banner--sticky': this.sticky,
      }
    },
    hasActions (): boolean {
      return Boolean(this.$slots.actions || this.$scopedSlots.actions)
    },
    hasIcon (): boolean {
      return Boolean(this.icon || this.$slots.icon)
    },
    isMobile (): boolean {
      return this.$vuetify.breakpoint.width < Number(this.mobileBreakPoint)
    },
    styles (): object {
      const styles = VSheet.options.computed.styles.call(this)

      if (!this.sticky) return styles

      const { bar, top } = this.$vuetify.application

      return {
        ...styles,
        position: 'sticky',
        top: `${bar + top}px`,
        zIndex: 1,
      }
    },
  },

  methods: {
    /** @public */
    toggle () {
      this.isActive = !this.isActive
    },
    iconClick (e: MouseEvent) {
      this.$emit('click:icon', e)
    },
    genIcon () {
      if (!this.hasIcon) return undefined

      let content

      if (this.icon) {
        content = this.$createElement(VIcon, {
          props: {
            color: this.iconColor,
            size: 28,
          },
        }, [this.icon])
      } else {
        content = this.$slots.icon
      }

      return this.$createElement(VAvatar, {
        staticClass: 'v-banner__icon',
        props: {
          color: this.color,
          size: 40,
        },
        on: {
          click: this.iconClick,
        },
      }, [content])
    },
    genText () {
      return this.$createElement('div', {
        staticClass: 'v-banner__text',
      }, this.$slots.default)
    },
    genActions () {
      if (!this.hasActions) return undefined

      const children = this.$scopedSlots.actions ? this.$scopedSlots.actions({
        dismiss: () => this.isActive = false,
      }) : this.$slots.actions

      return this.$createElement('div', {
        staticClass: 'v-banner__actions',
      }, children)
    },
    genContent () {
      return this.$createElement('div', {
        staticClass: 'v-banner__content',
      }, [
        this.genIcon(),
        this.genText(),
      ])
    },
    genWrapper () {
      return this.$createElement('div', {
        staticClass: 'v-banner__wrapper',
      }, [
        this.genContent(),
        this.genActions(),
      ])
    },
  },

  render (h): VNode {
    return h(VExpandTransition, [
      h('div', {
        staticClass: 'v-banner',
        class: this.classes,
        style: this.styles,
        directives: [{
          name: 'show',
          value: this.isActive,
        }],
      }, [this.genWrapper()]),
    ])
  },
})
