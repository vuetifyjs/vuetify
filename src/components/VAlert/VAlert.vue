<script>
  import VIcon from '../VIcon'

  import Contextualable from '../../mixins/contextualable'
  import Toggleable from '../../mixins/toggleable'
  import Transitionable from '../../mixins/transitionable'

  export default {
    name: 'v-alert',

    components: {
      VIcon
    },

    mixins: [Contextualable, Toggleable, Transitionable],

    props: {
      dismissible: Boolean,
      hideIcon: Boolean,
      icon: String
    },

    computed: {
      classes () {
        return {
          'alert': true,
          'alert--dismissible': this.dismissible,
          'error': this.error,
          'info': this.info,
          'primary': this.primary,
          'secondary': this.secondary,
          'success': this.success,
          'warning': this.warning
        }
      },

      mdIcon () {
        switch (true) {
          case !!this.icon: return this.icon
          case this.error: return 'warning'
          case this.info: return 'info'
          case this.success: return 'check_circle'
          case this.warning: return 'priority_high'
        }
      }
    },

    render (h) {
      const children = [h('div', this.$slots.default)]

      if (!this.hideIcon && this.mdIcon) {
        children.unshift(h('v-icon', {
          'class': 'alert__icon'
        }, this.mdIcon))
      }

      if (this.dismissible) {
        const close = h('a', {
          'class': 'alert__dismissible',
          domProps: { href: 'javascript:;' },
          on: { click: () => this.$emit('input', false) }
        }, [
          h('v-icon', {
            props: {
              right: true
            }
          }, 'cancel')
        ])

        children.push(close)
      }

      const alert = h('div', {
        'class': this.classes,
        directives: [{
          name: 'show',
          value: this.isActive
        }],
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
  }
</script>

<style lang="stylus" src="../../stylus/components/_alerts.styl"></style>
