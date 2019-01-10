// Styles
import './VAlert.sass'

// Extensions
import VSheet from '../VSheet'

// Components
import VIcon from '../VIcon'

// Mixins
import { factory as ToggleableFactory } from '../../mixins/toggleable'
import Transitionable from '../../mixins/transitionable'

// Types
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
    __cachedDismissible (): VNode | null {
      if (!this.dismissible) return null

      return this.$createElement('a', {
        staticClass: 'v-alert__dismissible',
        on: { click: () => { this.isActive = false } }
      }, [
        this.$createElement(VIcon, {
          props: {
            right: true
          }
        }, '$vuetify.icons.cancel')
      ])
    },
    __cachedIcon (): VNode | null {
      if (!this.computedIcon) return null

      return this.$createElement(VIcon, {
        staticClass: 'v-alert__icon'
      }, this.computedIcon)
    },
    classes (): object {
      return {
        ...VSheet.options.computed.classes.call(this),
        'v-alert--outline': this.hasOutline,
        'v-alert--prominent': this.prominent
      }
    },
    computedColor (): string {
      return (this.type && !this.color) ? this.type : (this.color || 'info')
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
    }
  },

  methods: {
    genAlert (): VNode {
      const setColor = this.hasOutline ? this.setTextColor : this.setBackgroundColor
      const children = [
        this.$slots.prepend || this.__cachedIcon,
        this.genContent(),
        this.$scopedSlots.append
          ? this.$scopedSlots.append({ toggle: this.toggle })
          : this.__cachedDismissible
      ]

      return this.$createElement('div', setColor(this.computedColor, {
        staticClass: 'v-alert',
        class: this.classes,
        style: this.styles,
        directives: [{
          name: 'show',
          value: this.isActive
        }]
      }), children)
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
