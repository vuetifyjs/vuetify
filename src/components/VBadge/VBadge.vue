<script>
  // Mixins
  import Colorable from '../../mixins/colorable'
  import Toggleable from '../../mixins/toggleable'

  export default {
    name: 'v-badge',

    mixins: [Colorable, Toggleable],

    props: {
      bottom: Boolean,
      color: {
        type: String,
        default: 'primary'
      },
      left: Boolean,
      overlap: Boolean,
      transition: {
        type: String,
        default: 'fab-transition'
      },
      value: {
        default: true
      }
    },

    computed: {
      classes () {
        return {
          'badge--bottom': this.bottom,
          'badge--left': this.left,
          'badge--overlap': this.overlap
        }
      }
    },

    render (h) {
      const badge = h('span', {
        staticClass: 'badge__badge',
        'class': [this.color],
        attrs: this.attrs,
        directives: [{
          name: 'show',
          value: this.isActive
        }]
      }, this.$slots.badge)

      return h('span', {
        staticClass: 'badge',
        'class': this.classes
      }, [
        h('transition', {
          props: {
            name: this.transition
          }
        }, [badge]),
        this.$slots.default
      ])
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_badges.styl"></style>
