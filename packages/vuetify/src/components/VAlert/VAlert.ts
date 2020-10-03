// Styles
import './VAlert.sass'

// Extensions
import VSheet from '../VSheet'

// Components
import VBtn from '../VBtn'
import VIcon from '../VIcon'

// Mixins
import Toggleable from '../../mixins/toggleable'
import Themeable from '../../mixins/themeable'
import Transitionable from '../../mixins/transitionable'

// Utilities
import { defineComponent, h, vShow, withDirectives } from 'vue'
import { breaking } from '../../util/console'

// Types
import type { VNode } from 'vue'

export default defineComponent({
  name: 'v-alert',

  mixins: [
    VSheet,
    Toggleable,
    Transitionable,
  ],

  props: {
    border: {
      type: String,
      validator (val: string) {
        return [
          'top',
          'right',
          'bottom',
          'left',
        ].includes(val)
      },
    },
    closeLabel: {
      type: String,
      default: '$vuetify.close',
    },
    coloredBorder: Boolean,
    dense: Boolean,
    dismissible: Boolean,
    closeIcon: {
      type: String,
      default: '$cancel',
    },
    icon: {
      default: false,
      type: [Boolean, String],
      validator (val: boolean | string) {
        return typeof val === 'string' || val === false
      },
    },
    outlined: Boolean,
    prominent: Boolean,
    text: Boolean,
    type: {
      type: String,
      validator (val: string) {
        return [
          'info',
          'error',
          'success',
          'warning',
        ].includes(val)
      },
    },
    value: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    __cachedBorder (): VNode | null {
      if (!this.border) return null

      let data: Dictionary = {
        class: {
          'v-alert__border': true,
          [`v-alert__border--${this.border}`]: true,
        },
      }

      if (this.coloredBorder) {
        data = this.setBackgroundColor(this.computedColor, data)
        data.class['v-alert__border--has-color'] = true
      }

      return h('div', data)
    },
    __cachedDismissible (): VNode | null {
      if (!this.dismissible) return null

      const color = this.iconColor

      return h(VBtn, {
        class: 'v-alert__dismissible',
        color,
        icon: true,
        small: true,
        'aria-label': this.$vuetify.lang.t(this.closeLabel),
        onClick: () => (this.isActive = false),
      }, () => h(VIcon, {
        color,
      }, () => this.closeIcon),
      )
    },
    __cachedIcon (): VNode | null {
      if (!this.computedIcon) return null

      return h(VIcon, {
        class: 'v-alert__icon',
        color: this.iconColor,
      }, () => this.computedIcon)
    },
    classes (): object {
      const classes: Record<string, boolean> = {
        ...VSheet.computed!.classes.call(this),
        'v-alert': true,
        'v-alert--border': Boolean(this.border),
        'v-alert--dense': !!this.dense,
        'v-alert--outlined': !!this.outlined,
        'v-alert--prominent': !!this.prominent,
        'v-alert--text': !!this.text,
      }

      if (this.border) {
        classes[`v-alert--border-${this.border}`] = true
      }

      return classes
    },
    computedColor (): string | undefined {
      return this.color || this.type
    },
    computedIcon (): string | boolean {
      if (this.icon === false) return false
      if (typeof this.icon === 'string' && this.icon) return this.icon
      if (!['error', 'info', 'success', 'warning'].includes(this.type!)) return false

      return `$${this.type}`
    },
    hasColoredIcon (): boolean {
      return !!(
        this.hasText ||
        (Boolean(this.border) && this.coloredBorder)
      )
    },
    hasText (): boolean {
      return !!(this.text || this.outlined)
    },
    iconColor (): string | undefined {
      return this.hasColoredIcon ? this.computedColor : undefined
    },
    isDark (): boolean {
      if (
        this.type &&
        !this.coloredBorder &&
        !this.outlined
      ) return true

      return Themeable.computed!.isDark.call(this)
    },
  },

  created () {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('outline')) {
      breaking('outline', 'outlined', this)
    }
  },

  methods: {
    genWrapper (): VNode {
      const children = [
        this.$slots.prepend?.() || this.__cachedIcon,
        this.genContent(),
        this.__cachedBorder,
        this.$slots.append?.(),
        this.$slots.close
          ? this.$slots.close({ toggle: this.toggle })
          : this.__cachedDismissible,
      ]

      return h('div', {
        class: 'v-alert__wrapper',
      }, children)
    },
    genContent (): VNode {
      return h('div', {
        class: 'v-alert__content',
      }, this.$slots.default?.())
    },
    genAlert (): VNode {
      let data: Dictionary = {
        role: 'alert',
        class: this.classes,
        style: this.styles,
      }

      if (!this.coloredBorder) {
        const setColor = this.hasText ? this.setTextColor : this.setBackgroundColor
        data = setColor(this.computedColor, data)
      }

      return withDirectives(h('div', data, [this.genWrapper()]), [
        [vShow, this.isActive],
      ])
    },
    /** @public */
    toggle () {
      this.isActive = !this.isActive
    },
  },

  render (): VNode {
    const render = this.genAlert()

    if (!this.transition) return render

    return h('transition', {
      name: this.transition,
      origin: this.origin,
      mode: this.mode,
    }, [render])
  },
})
