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
    overlay: {
      type: Boolean,
      default: true
    },
    removeTransition: Boolean,
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
  },

  methods: {
    closeConditional (e) {
      console.log(e.target)
      // close dialog if !persistent and clicked outside
      return this.persistent ? false : true
    },

    resize () {
      if (!this.isActive) return

      let actions = this.$children.filter(c => c.$options.propsData.actions)

      // make sure we have the actions card row
      if (actions.length) {
        let btns = actions[0].$slots.default

        let maxButtonWidth = (this.$refs.dialog.offsetWidth - 8 - (8 * btns.length)) / btns.length
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

    if (!this.removeTransition)
      dialog = h(this.transition, {
        props: {
          origin: this.origin
        }
      }, [dialog])

    if (this.overlay)
      dialog = h('v-overlay', {
        props: {
          value: this.isActive
        },
      }, [dialog])

    return dialog
  }
}
