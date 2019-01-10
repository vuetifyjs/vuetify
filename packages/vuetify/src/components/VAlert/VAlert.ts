// Styles
import './VAlert.sass'

// Extensions
import VSheet from '../VSheet'

// Components
import VIcon from '../VIcon'

// Mixins
import { factory as ToggleableFactory } from '../../mixins/toggleable'
import Themeable from '../../mixins/themeable'
import Transitionable from '../../mixins/transitionable'

// Types
import { VNodeData } from 'vue'
import { VNode } from 'vue/types'
import mixins from '../../util/mixins'
import { breaking, deprecate } from '../../util/console'

/* @vue/component */
export default mixins(
  VSheet,
  ToggleableFactory('show'),
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
          'left'
        ].includes(val)
      }
    },
    coloredBorder: Boolean,
    closeLabel: {
      type: String,
      default: '$vuetify.close'
    },
    dense: Boolean,
    dismissible: Boolean,
    icon: String,
    outline: Boolean,
    outlined: Boolean,
    prominent: Boolean,
    show: Boolean,
    type: {
      type: String,
      validator (val: string) {
        return [
          'info',
          'error',
          'success',
          'warning'
        ].includes(val)
      }
    },
    /* @deprecated */
    value: {
      type: Boolean,
      default: undefined
    }
  },

  created () {
    if (this.value !== undefined) {
      breaking('value', 'show', this)
    }

    if (this.outline) {
      deprecate('outline', 'outlined')
    }
  },

  computed: {
    __cachedBorder (): VNode | null {
      if (!this.border) return null
      let data: VNodeData = {
        staticClass: 'v-alert__border',
        class: {
          [`v-alert__border--${this.border}`]: true
        }
      }

      if (this.coloredBorder) {
        data = this.setBackgroundColor(this.computedColor, data)
        data.class['v-alert__border--has-color'] = true
      }

      return this.$createElement('div', data)
    },
    __cachedDismissible (): VNode | null {
      if (!this.dismissible) return null

      return this.$createElement('a', {
        staticClass: 'v-alert__dismissible',
        on: { click: () => { this.isActive = false } }
      }, [
        this.$createElement(VIcon, {
          attrs: {
            'aria-hidden': false,
            'aria-label': this.$vuetify.t(this.closeLabel)
          },
          props: {
            right: true
          }
        }, '$vuetify.icons.cancel')
      ])
    },
    __cachedIcon (): VNode | null {
      if (!this.computedIcon || this.dense) return null

      return this.$createElement(VIcon, {
        staticClass: 'v-alert__icon',
        props: {
          color: this.coloredBorder ? this.computedColor : undefined
        }
      }, this.computedIcon)
    },
    classes (): object {
      const classes: Record<string, boolean> = {
        ...VSheet.options.computed.classes.call(this),
        'v-alert--border': Boolean(this.border),
        'v-alert--outline': this.hasOutline,
        'v-alert--prominent': this.prominent
      }

      if (this.border) {
        classes[`v-alert--border-${this.border}`] = true
      }

      return classes
    },
    computedColor (): string {
      return (this.type && !this.color) ? this.type : (this.color || '')
    },
    computedIcon (): string | void {
      switch (this.type) {
        case 'info': return '$vuetify.icons.info'
        case 'error': return '$vuetify.icons.error'
        case 'success': return '$vuetify.icons.success'
        case 'warning': return '$vuetify.icons.warning'
        default: return this.icon
      }
    },
    hasOutline (): boolean {
      return this.outline || this.outlined
    },
    isDark () {
      if (this.type && !this.coloredBorder) return true

      return Themeable.options.computed.isDark.call(this)
    }
  },

  methods: {
    genAlert (): VNode {
      const children = [
        this.$slots.prepend || this.__cachedIcon,
        this.__cachedBorder,
        this.genContent(),
        this.$slots.append,
        this.$scopedSlots.close
          ? this.$scopedSlots.close({ toggle: this.toggle })
          : this.__cachedDismissible
      ]
      let data: VNodeData = {
        staticClass: 'v-alert',
        class: this.classes,
        style: this.styles,
        directives: [{
          name: 'show',
          value: this.isActive
        }]
      }

      if (!this.coloredBorder) {
        const setColor = this.hasOutline ? this.setTextColor : this.setBackgroundColor
        data = setColor(this.computedColor, data)
      }

      return this.$createElement('div', data, children)
    },
    genContent (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-alert__content'
      }, this.$slots.default)
    },
    toggle () {
      this.isActive = !this.isActive
    }
  },

  render (h): VNode {
    const render = this.genAlert()

    if (!this.transition) return render

    return h('transition', {
      props: {
        name: this.transition,
        origin: this.origin,
        mode: this.mode
      }
    }, [render])
  }
})
