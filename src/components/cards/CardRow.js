export default {
  name: 'card-row',

  props: {
    actions: Boolean,

    height: {
      type: String,
      default: 'auto'
    },

    img: String
  },

  data () {
    return {
      stackedActions: false
    }
  },

  computed: {
    classes () {
      return {
        'card__row': true,
        'card__row--actions': this.actions,
        'card__row--actions-stacked': this.stackedActions,
      }
    },

    styles () {
      const styles = {
        height: this.height
      }

      if (this.img) {
        styles.background = `url(${this.img}) center center / cover no-repeat`
      }

      return styles
    }
  },

  methods: {
    resize () {
      if (this.$el.offsetWidth === 0) return

      const btns = this.$refs.actions.children
      const maxButtonWidth = (this.$el.offsetWidth - 8 - (8 * btns.length)) / btns.length
      let shouldStack = false

      for (let i = btns.length; i--;) {
        if (btns[i].children.length) {
          let span = btns[i].children[0]
          if (span.scrollWidth > maxButtonWidth) {
            shouldStack = true
            break
          }
        }
      }

      this.stackedActions = shouldStack
    }
  },

  mounted () {
    if (this.actions) {
      this.$vuetify.load(() => {
        window.addEventListener('resize', this.resize, false)
        this.$refs.actions.addEventListener('transitionend', this.resize, false)
      })
    }
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize, false)
    this.$refs.actions.removeEventListener('transitionend', this.resize, false)
  },

  render (h) {
    let data = {
      'class': this.classes,
      style: this.styles
    }

    if (this.actions) data.ref = 'actions'

    return h('div', data, this.$slots.default)
  },

}
