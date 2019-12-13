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
import mixins from '../../util/mixins'
import { breaking } from '../../util/console'

// Types
import { VNodeData } from 'vue'
import { VNode } from 'vue/types'

/* @vue/component */
export default mixins(
  VSheet,
  Toggleable,
  Transitionable
).extend({
  name: 'v-alert',

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
    icon: {
      default: '',
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

      let data: VNodeData = {
        staticClass: 'v-alert__border',
        class: {
          [`v-alert__border--${this.border}`]: true,
        },
      }

      if (this.coloredBorder) {
        data = this.setBackgroundColor(this.computedColor, data)
        data.class['v-alert__border--has-color'] = true
      }

      return this.$createElement('div', data)
    },
    __cachedDismissible (): VNode | null {
      if (!this.dismissible) return null

      const color = this.iconColor

      return this.$createElement(VBtn, {
        staticClass: 'v-alert__dismissible',
        props: {
          color,
          icon: true,
          small: true,
        },
        attrs: {
          'aria-label': this.$vuetify.lang.t(this.closeLabel),
        },
        on: {
          click: () => (this.isActive = false),
        },
      }, [
        this.$createElement(VIcon, {
          props: { color },
        }, '$cancel'),
      ])
    },
    __cachedIcon (): VNode | null {
      if (!this.computedIcon) return null

      return this.$createElement(VIcon, {
        staticClass: 'v-alert__icon',
        props: { color: this.iconColor },
      }, this.computedIcon)
    },
    classes (): object {
      const classes: Record<string, boolean> = {
        ...VSheet.options.computed.classes.call(this),
        'v-alert--border': Boolean(this.border),
        'v-alert--dense': this.dense,
        'v-alert--outlined': this.outlined,
        'v-alert--prominent': this.prominent,
        'v-alert--text': this.text,
      }

      if (this.border) {
        classes[`v-alert--border-${this.border}`] = true
      }

      return classes
    },
    computedColor (): string {
      return this.color || this.type
    },
    computedIcon (): string | boolean {
      if (this.icon === false) return false
      if (typeof this.icon === 'string' && this.icon) return this.icon
      if (!['error', 'info', 'success', 'warning'].includes(this.type)) return false

      return `$${this.type}`
    },
    hasColoredIcon (): boolean {
      return (
        this.hasText ||
        (Boolean(this.border) && this.coloredBorder)
      )
    },
    hasText (): boolean {
      return this.text || this.outlined
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

      return Themeable.options.computed.isDark.call(this)
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
        this.$slots.prepend || this.__cachedIcon,
        this.genContent(),
        this.__cachedBorder,
        this.$slots.append,
        this.$scopedSlots.close
          ? this.$scopedSlots.close({ toggle: this.toggle })
          : this.__cachedDismissible,
      ]

      const data: VNodeData = {
        staticClass: 'v-alert__wrapper',
      }

      return this.$createElement('div', data, children)
    },
    genContent (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-alert__content',
      }, this.$slots.default)
    },
    genAlert (): VNode {
      let data: VNodeData = {
        staticClass: 'v-alert',
        attrs: {
          role: 'alert',
        },
        class: this.classes,
        style: this.styles,
        directives: [{
          name: 'show',
          value: this.isActive,
        }],
      }

      if (!this.coloredBorder) {
        const setColor = this.hasText ? this.setTextColor : this.setBackgroundColor
        data = setColor(this.computedColor, data)
      }

      return this.$createElement('div', data, [this.genWrapper()])
    },
    /** @public */
    toggle () {
      this.isActive = !this.isActive
    },
  },

  render (h): VNode {
    const render = this.genAlert()

    if (!this.transition) return render

    return h('transition', {
      props: {
        name: this.transition,
        origin: this.origin,
        mode: this.mode,
      },
    }, [render])
  },
})
