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
        'dialog--active': this.isActive,
        'dialog--persistent': this.persistent,
        'dialog--fullscreen': this.fullscreen,
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
        'overlay--modal-bottom': this.bottom
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
      let actions = this.$children.filter(c => c.$options.propsData.actions )

      // make sure we have the actions card row
      if (actions.length) {
        actions = actions[0]
        let btns = actions.$slots.default

        let maxButtonWidth = (this.$slots.default[0].elm.offsetWidth - 8 - (8 * btns.length) ) / btns.length
        this.stackedActions = false

        for (let i=btns.length; i--;) {
          let span = btns[i].child._vnode.children[0].elm
          if (span.scrollWidth > maxButtonWidth) {
            this.stackedActions = true
            break
          }
        }

        this.stackedActions ? actions.$el.classList.add('card__row--actions-stacked') : actions.$el.classList.remove('card__row--actions-stacked')
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
    return h('div', {
      'class': 'dialog',
      ref: 'dialog',
      directives: [{ name: 'click-outside', value: this.closeConditional }],
    }, [this.$slots.default])
  }
}
