// Styles
import '../../stylus/components/_alerts.styl'

// Extensions
import VSheet from '../VSheet'

// Components
import VBtn from '../VBtn'
import VIcon from '../VIcon'

// Mixins
import Toggleable from '../../mixins/toggleable'
import Transitionable from '../../mixins/transitionable'

// Types
import { VNode } from 'vue/types'
import mixins from '../../util/mixins'
import Themeable from '../../mixins/themeable'

/* @vue/component */
export default mixins(
  Toggleable,
  Transitionable,
  VSheet
).extend({
  name: 'v-alert',

  props: {
    closeIcon: {
      type: String,
      default: '$vuetify.icons.cancel'
    },
    dismissible: Boolean,
    icon: String,
    outline: Boolean,
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
    }
  },

  computed: {
    classes (): object {
      return {
        ...VSheet.options.computed.classes.call(this),
        'v-alert--outline': this.outline
      }
    },
    computedColor (): string {
      return this.color || this.type
    },
    computedIcon (): string | void {
      if (this.icon || !this.type) return this.icon

      switch (this.type) {
        case 'info': return '$vuetify.icons.info'
        case 'error': return '$vuetify.icons.error'
        case 'success': return '$vuetify.icons.success'
        case 'warning': return '$vuetify.icons.warning'
      }
    },
    isDark () {
      if (this.light) return false

      return this.computedColor
        ? true
        : Themeable.options.computed.isDark.call(this)
    }
  },

  methods: {
    genIcon () {
      if (!this.computedIcon) return null

      return this.$createElement('div', {
        staticClass: 'v-alert__action'
      }, [this.$createElement(VIcon, this.computedIcon)])
    },
    genContent () {
      return this.$createElement('div', this.$slots.default)
    },
    genDismissible () {
      if (!this.dismissible) return null

      const btn = this.$createElement(VBtn, {
        props: {
          icon: true
        },
        attrs: {
          'aria-label': 'Close'
        },
        on: {
          click: (e: Event) => {
            this.isActive = false
            this.$emit('click:close', e)
          }
        }
      }, [this.$createElement(VIcon, this.closeIcon)])

      return this.$createElement('div', {
        staticClass: 'v-alert__dismissible'
      }, [btn])
    }
  },

  render (h): VNode {
    const children = [
      this.genIcon(),
      this.genContent(),
      this.genDismissible()
    ]

    const setColor = this.outline ? this.setTextColor : this.setBackgroundColor
    const alert = h('div', setColor(this.computedColor, {
      staticClass: 'v-alert',
      class: this.classes,
      style: this.styles,
      attrs: {
        role: 'alert'
      },
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    }), children)

    if (!this.transition) return alert

    return h('transition', {
      props: {
        name: this.transition,
        origin: this.origin,
        mode: this.mode
      }
    }, [alert])
  }
})
