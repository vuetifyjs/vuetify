<script>
  import Bootable from '../../mixins/bootable'
  import Detachable from '../../mixins/detachable'
  import Overlayable from '../../mixins/overlayable'
  import Toggleable from '../../mixins/toggleable'

  import ClickOutside from '../../directives/click-outside'

  export default {
    name: 'v-dialog',

    mixins: [Bootable, Detachable, Overlayable, Toggleable],

    directives: {
      ClickOutside
    },

    props: {
      disabled: Boolean,
      persistent: Boolean,
      fullscreen: Boolean,
      fullWidth: Boolean,
      lazy: Boolean,
      origin: {
        type: String,
        default: 'center center'
      },
      width: {
        type: [String, Number],
        default: 290
      },
      scrollable: Boolean,
      transition: {
        type: [String, Boolean],
        default: 'dialog-transition'
      }
    },

    computed: {
      classes () {
        return {
          [(`dialog ${this.contentClass}`).trim()]: true,
          'dialog--active': this.isActive,
          'dialog--persistent': this.persistent,
          'dialog--fullscreen': this.fullscreen,
          'dialog--stacked-actions': this.stackedActions && !this.fullscreen,
          'dialog--scrollable': this.scrollable
        }
      }
    },

    watch: {
      isActive (val) {
        if (val) {
          !this.fullscreen && !this.hideOverlay && this.genOverlay()
          this.fullscreen && this.hideScroll()
          this.$refs.content.focus()
        } else {
          if (!this.fullscreen) this.removeOverlay()
          else this.showScroll()
        }
      }
    },

    mounted () {
      this.isBooted = this.isActive
      this.$vuetify.load(() => (this.isActive && this.genOverlay()))
    },

    methods: {
      closeConditional (e) {
        // close dialog if !persistent and clicked outside
        return !this.persistent
      }
    },

    render (h) {
      const children = []
      const data = {
        'class': this.classes,
        ref: 'dialog',
        directives: [
          { name: 'click-outside', value: this.closeConditional },
          { name: 'show', value: this.isActive }
        ]
      }

      if (!this.fullscreen) {
        data.style = {
          width: isNaN(this.width) ? this.width : `${this.width}px`
        }
      }

      if (this.$slots.activator) {
        children.push(h('div', {
          'class': 'dialog__activator',
          on: {
            click: e => {
              e.stopPropagation()
              if (!this.disabled) this.isActive = !this.isActive
            }
          }
        }, [this.$slots.activator]))
      }

      const dialog = h('transition', {
        props: {
          name: this.transition || '', // If false, show nothing
          origin: this.origin
        }
      }, [h('div', data,
        this.lazy && this.isBooted || !this.lazy ? this.$slots.default : null
      )])

      children.push(h('div', {
        'class': 'dialog__content',
        ref: 'content'
      }, [dialog]))

      return h('div', {
        'class': 'dialog__container',
        style: {
          display: !this.$slots.activator && 'none' || this.fullWidth ? 'block' : 'inline-block'
        }
      }, children)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_dialogs.styl"></style>
