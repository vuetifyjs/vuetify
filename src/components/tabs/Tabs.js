export default {
  name: 'tabs',

  data () {
    return {
      activators: [],
      isActive: null,
      reverse: false,
      target: null,
      resizeDebounce: {},
      targetEl: null
    }
  },

  props: {
    centered: Boolean,
    grow: Boolean,
    icons: Boolean,
    scrollBars: Boolean,
    value: String
  },

  computed: {
    classes () {
      return {
        'tabs': true,
        'tabs--centered': this.centered,
        'tabs--grow': this.grow,
        'tabs--icons': this.icons,
        'tabs--scroll-bars': this.scrollBars
      }
    }
  },

  watch: {
    value () {
      this.tabClick(this.value)
    },
    isActive () {
      this.activators.forEach(i => {
        i.toggle(this.target)

        if (i.isActive) {
          this.slider(i.$el)
        }
      })

      this.$refs.content.$children.forEach(i => i.toggle(this.target, this.reverse))
      this.$emit('input', this.target)
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.init()
      window.addEventListener('resize', this.resize, false)
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize, false)
  },

  methods: {
    init () {
      this.activators = this.$refs.activators.$children.filter(i => i.$options._componentTag === 'v-tab-item')
      setTimeout(() => {
        this.tabClick(this.value || this.activators[0].target)
      }, 200)
    },
    resize () {
      clearTimeout(this.resizeDebounce)

      this.resizeDebounce = setTimeout(() => {
        this.slider()
      }, 250)
    },
    slider (el) {
      this.targetEl = el || this.targetEl
      this.$refs.slider.style.width = `${this.targetEl.clientWidth}px`
      this.$refs.slider.style.left = `${this.targetEl.offsetLeft}px`
    },
    tabClick (target) {
      this.target = target

      this.$nextTick(() => {
        const nextIndex = this.$refs.content.$children.findIndex(i => i.id === this.target)
        this.reverse = nextIndex < this.isActive
        this.isActive = nextIndex
      })
    }
  },

  render (h) {
    const tabs = h('v-tabs-tabs', {
      ref: 'activators'
    }, [
      h('v-tabs-slider', { ref: 'slider' }),
      this.$slots.activators
    ])

    const items = h('v-tabs-items', {
      'class': 'tabs__items',
      ref: 'content'
    }, [this.$slots.content])

    return h('div', {
      'class': this.classes,
      domProps: { id: this.id }
    }, [this.$slots.default, tabs, items])
  }
}
