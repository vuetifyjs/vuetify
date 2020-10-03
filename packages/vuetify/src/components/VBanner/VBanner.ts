// Styles
import './VBanner.sass'

// Extensions
import VSheet from '../VSheet'

// Components
import VAvatar from '../VAvatar'
import VIcon from '../VIcon'
import { VExpandTransition } from '../transitions'

// Mixins
import Mobile from '../../mixins/mobile'
import Toggleable from '../../mixins/toggleable'

// Utilities
import { defineComponent, h } from 'vue'
import { convertToUnit } from '../../util/helpers'

// Types
import type { VNode } from 'vue'

export default defineComponent({
  name: 'v-banner',

  mixins: [
    VSheet,
    Mobile,
    Toggleable,
  ],

  inheritAttrs: false,

  props: {
    app: Boolean,
    icon: String,
    iconColor: String,
    singleLine: Boolean,
    sticky: Boolean,
    value: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    classes (): object {
      return {
        ...VSheet.computed!.classes.call(this),
        'v-banner': true,
        'v-banner--has-icon': this.hasIcon,
        'v-banner--is-mobile': this.isMobile,
        'v-banner--single-line': this.singleLine,
        'v-banner--sticky': this.isSticky,
      }
    },
    hasIcon (): boolean {
      return Boolean(this.icon || this.$slots.icon)
    },
    isSticky (): boolean {
      return this.sticky || this.app
    },
    styles (): object {
      const styles: Record<string, any> = { ...VSheet.options.computed.styles.call(this) }

      if (this.isSticky) {
        const top = !this.app
          ? 0
          : (this.$vuetify.application.bar + this.$vuetify.application.top)

        styles.top = convertToUnit(top)
        styles.position = 'sticky'
        styles.zIndex = 1
      }

      return styles
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
        content = h(VIcon, {
          color: this.iconColor,
          size: 28,
        }, [this.icon])
      } else {
        content = this.$slots.icon?.()
      }

      return h(VAvatar, {
        class: 'v-banner__icon',
        color: this.color,
        size: 40,
        onClick: this.iconClick,
      }, content)
    },
    genText () {
      return h('div', {
        class: 'v-banner__text',
      }, this.$slots.default?.())
    },
    genActions () {
      const children = this.$slots.actions?.({
        dismiss: () => this.isActive = false,
      })

      if (!children) return undefined

      return h('div', {
        class: 'v-banner__actions',
      }, children)
    },
    genContent () {
      return h('div', {
        class: 'v-banner__content',
      }, [
        this.genIcon(),
        this.genText(),
      ])
    },
    genWrapper () {
      return h('div', {
        class: 'v-banner__wrapper',
      }, [
        this.genContent(),
        this.genActions(),
      ])
    },
  },

  render (): VNode {
    return h(VExpandTransition, [
      h('div', this.setBackgroundColor(this.color, {
        class: this.classes,
        style: this.styles,
        directives: [{
          name: 'show',
          value: this.isActive,
        }],
      }), [this.genWrapper()]),
    ])
  },
})
