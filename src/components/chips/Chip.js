import Toggleable from '~mixins/toggleable'

export default {
  name: 'chip',

  mixins: [Toggleable],

  props: {
    close: Boolean,
    label: Boolean,
    outline: Boolean,
    small: Boolean,
    value: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes () {
      return {
        'chip': true,
        'chip--label': this.label,
        'chip--outline': this.outline,
        'chip--small': this.small,
        'chip--removable': this.close
      }
    }
  },

  render (h) {
    const children = [this.$slots.default]
    const data = {
      'class': this.classes,
      attrs: {
        tabindex: -1
      },
      directives: [{
        name: 'show',
        value: this.isActive
      }]
    }

    if (this.close) {
      const icon = h('v-icon', { props: { right: true } }, 'cancel')

      children.push(h('a', {
        'class': 'chip__close',
        domProps: { href: 'javascript:;' },
        on: {
          click: e => {
            e.preventDefault()

            this.$emit('input', false)
          }
        }
      }, [icon]))
    }

    return h('span', data, children)
  }
}
