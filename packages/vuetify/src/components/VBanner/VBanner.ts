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
      default: 960
    } as PropValidator<string | number>,
    singleLine: Boolean,
    tile: {
      type: Boolean,
      default: true
    },
    value: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes (): object {
      return {
        ...VSheet.options.computed.classes.call(this),
        'v-banner--has-icon': this.hasIcon,
        'v-banner--is-mobile': this.isMobile,
        'v-banner--single-line': this.singleLine
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
    }
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
            size: 28
          }
        }, [ this.icon ])
      } else {
        content = this.$slots.icon
      }

      return this.$createElement(VAvatar, {
        staticClass: 'v-banner__icon',
        props: {
          color: this.color,
          size: 40
        },
        on: {
          click: this.iconClick
        }
      }, [content])
    },
    genContent () {
      return this.$createElement('div', {
        staticClass: 'v-banner__content'
      }, this.$slots.default)
    },
    genActions () {
      if (!this.hasActions) return undefined

      const children = this.$scopedSlots.actions ? this.$scopedSlots.actions({
        dismiss: () => this.isActive = false
      }) : this.$slots.actions

      return this.$createElement('div', {
        staticClass: 'v-banner__actions'
      }, children)
    },
    genBanner () {
      return this.$createElement('div', {
        staticClass: 'v-banner',
        attrs: this.$attrs,
        class: this.classes,
        style: this.styles,
        on: this.$listeners
      }, [
        this.genWrapper(),
        this.genActions()
      ])
    },
    genWrapper () {
      return this.$createElement('div', {
        staticClass: 'v-banner__wrapper'
      }, [
        this.genIcon(),
        this.genContent()
      ])
    }
  },

  render (h): VNode {
    return h(VExpandTransition, [
      h('div', {
        directives: [{
          name: 'show',
          value: this.isActive
        }]
      },[this.genBanner()])
    ])
  }
})
