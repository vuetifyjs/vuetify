import Toggleable from '../../mixins/toggleable'

export default {
  name: 'alert',

  mixins: [Toggleable],

  props: {
    dismissible: Boolean,
    error: Boolean,
    hideIcon: Boolean,
    icon: String,
    info: Boolean,
    success: Boolean,
    warning: Boolean
  },

  computed: {
    classes () {
      return {
        'alert': true,
        'alert--dismissible': this.dismissible,
        'alert--error': this.error,
        'alert--info': this.info,
        'alert--success': this.success,
        'alert--warning': this.warning
      }
    },

    mdIcon () {
      switch (true) {
        case this.icon:
          return this.icon
        case this.error:
          return 'warning'
        case this.info:
          return 'info'
        case this.success:
          return 'check_circle'
        case this.warning:
          return 'priority_high'
      }
    }
  },

  render (h) {
    const children = [h('div', this.$slots.default)]

    if (!this.hideIcon) {
      children.unshift(h('v-icon', {
        'class': 'alert__icon'
      }, this.mdIcon))
    }

    if (this.dismissible) {
      children.push(h('a', {
        'class': 'alert__dismissible',
        domProps: { href: 'javascript:;' },
        on: {
          click: () => (this.$emit('input', false))
        }
      }, [
        h('v-icon', { props: { right: true }}, 'cancel')
      ]))
    }

    return h('div', {
      'class': this.classes,
      directives: [{
        name: 'show',
        value: this.isActive
      }]
    }, children)
  }
}
