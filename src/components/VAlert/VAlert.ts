// Styles
import '../../stylus/components/_alerts.styl'

// Components
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import Toggleable from '../../mixins/toggleable'
import Transitionable from '../../mixins/transitionable'

// Types
import { VNode } from 'vue/types'
import mixins from '../../util/mixins'

/* @vue/component */
export default mixins(Colorable, Toggleable, Transitionable).extend({
  name: 'v-alert',

  props: {
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

  data: () => ({
    defaultColor: 'error'
  }),

  computed: {
    classes (): object {
      const color = (this.type && !this.color) ? this.type : this.computedColor
      const classes = {
        'v-alert--outline': this.outline
      }

      return this.outline ? this.addTextColorClassChecks(classes, color)
        : this.addBackgroundColorClassChecks(classes, color)
    },
    computedIcon (): string | void {
      if (this.icon || !this.type) return this.icon

      switch (this.type) {
        case 'info': return '$vuetify.icons.info'
        case 'error': return '$vuetify.icons.error'
        case 'success': return '$vuetify.icons.success'
        case 'warning': return '$vuetify.icons.warning'
      }
    }
  },

  render (h): VNode {
    const children = [h('div', this.$slots.default)]

    if (this.computedIcon) {
      children.unshift(h(VIcon, {
        'class': 'v-alert__icon'
      }, this.computedIcon))
    }

    if (this.dismissible) {
      const close = h('a', {
        'class': 'v-alert__dismissible',
        on: { click: () => { this.isActive = false } }
      }, [
        h(VIcon, {
          props: {
            right: true
          }
        }, '$vuetify.icons.cancel')
      ])

      children.push(close)
    }

    const alert = h('div', {
      staticClass: 'v-alert',
      'class': this.classes,
      directives: [{
        name: 'show',
        value: this.isActive
      }] as any,
      on: this.$listeners
    }, children)

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
