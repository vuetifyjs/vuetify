import Toggleable from '../../mixins/toggleable'

export default {
  name: 'dialog',

  mixins: [Toggleable],

  data () {
    return {
      stackedActions: false
    }
  },

  props: {
    persistent: Boolean,
    fullscreen: Boolean,
    overlay: Boolean,
    origin: {
      type: String,
      default: 'center center'
    },
    transition: {
      type: String,
      default: 'v-modal-transition'
    }
  },

  computed: {
    classes () {
      return {
        'dialog': true,
        'dialog--active': this.isActive,
        'dialog--persistent': this.persistent,
        'dialog--fullscreen': this.fullscreen,
        'dialog--stacked-actions': this.stackedActions && !this.fullscreen,
      }
    },

    computedOrigin () {
      return this.origin
    },

    computedTransition () {
      if (this.transition !== 'v-modal-transition') {
        return this.transition
      }

      return this.bottom ? 'v-slide-y-reverse-transition' : this.transition
    },

    overlayClasses () {
      return {
        'overlay--modal-bottom': false  // this.bottom
      }
    }
  },

  methods: {
    wasClickInside (target) {
      return this.$refs.dialog !== target && !this.$refs.dialog.contains(target)
    },

    closeConditional (e) {
      return this.persistent ? false : this.wasClickInside()
    },

    resize () {
      if (!this.isActive) return

      let actions = this.$children.filter(c => c.$options.propsData.actions )

      // make sure we have the actions card row
      if (actions.length) {
        let btns = actions[0].$slots.default

        let maxButtonWidth = (this.$slots.default[0].elm.offsetWidth - 8 - (8 * btns.length) ) / btns.length
        let shouldStack = false

        for (let i=btns.length; i--;) {
          let span = btns[i].child._vnode.children[0].elm
          if (span.scrollWidth > maxButtonWidth) {
            shouldStack = true
            break
          }
        }

        this.stackedActions = shouldStack
      }
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.resize()
      window.addEventListener('resize', this.resize, false)
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize, false)
  },

  render (h) {
    let dialog =  h('div', {
      'class': this.classes,
      ref: 'dialog',
      directives: [
        { name: 'click-outside', value: this.closeConditional },
        { name: 'show', value: this.isActive }
      ],
    }, [this.$slots.default])

    if (this.overlay)
      dialog = h('v-overlay', {
        'class': this.overlayClasses,
        props: {
          value: this.isActive
        },
      }, [dialog])

    return dialog
  }
}
