import Bootable from '../../mixins/bootable'
import Themeable from '../../mixins/themeable'

export default {
  name: 'tabs',

  mixins: [Bootable, Themeable],

  data () {
    return {
      activators: [],
      activeIndex: null,
      isMobile: false,
      overflow: false,
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
    mobileBreakPoint: {
      type: [Number, String],
      default: 1024
    },
    scrollBars: Boolean,
    value: String,
    bgColor: String,
    sliderColor: String,
  },

  computed: {
    classes () {
      return {
        'tabs': true,
        'tabs--centered': this.centered,
        'tabs--grow': this.grow,
        'tabs--icons': this.icons,
        'tabs--scroll-bars': this.scrollBars,
        'tabs--dark': !this.light && this.dark,
        'tabs--light': this.light || !this.dark,
        'tabs--overflow': this.overflow
      }
    }
  },

  watch: {
    value () {
      this.tabClick(this.value)
    },
    activeIndex () {
      if (this.isBooted) this.overflow = true

      this.activators.forEach(i => {
        i.toggle(this.target)

        if (i.isActive) {
          this.slider(i.$el)
        }
      })

      this.$refs.content.$children.forEach(i => i.toggle(this.target, this.reverse, this.isBooted))
      this.$emit('input', this.target)
      this.isBooted = true
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.activators = this.$refs.activators.$children.filter(i => i.$options._componentTag === 'v-tab-item')
      const tab = this.value || (this.activators[0] || {}).action
      tab && this.tabClick(tab) && this.resize()
      window.addEventListener('resize', this.resize, false)
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize, false)
  },

  methods: {
    resize () {
      clearTimeout(this.resizeDebounce)

      this.resizeDebounce = setTimeout(() => {
        this.slider()
        this.isMobile = window.innerWidth < this.mobileBreakPoint
      }, 0)
    },
    slider (el) {
      this.targetEl = el || this.targetEl
      this.$refs.slider.style.width = `${this.targetEl.clientWidth}px`
      this.$refs.slider.style.left = `${this.targetEl.offsetLeft}px`
    },
    tabClick (target) {
      this.target = target

      if (!this.$refs.content) {
        this.activeIndex = target
        return
      }

      this.$nextTick(() => {
        const nextIndex = this.$refs.content.$children.findIndex(i => i.id === this.target)
        this.reverse = nextIndex < this.activeIndex
        this.activeIndex = nextIndex
      })
    },
    transitionComplete () {
      this.overflow = false
    }
  },

  render (h) {
    const tabs = h('v-tabs-tabs', {
      ref: 'activators',
      props: {
        mobile: this.isMobile,
        bgColor: this.bgColor
      }
    }, [
      h('v-tabs-slider', {
        ref: 'slider',
        class: ((colorClass) => {
          let c = {}
          c[colorClass] = true
          return c
        })(this.sliderColor)
      }),
      this.$slots.activators
    ])

    const items = h('v-tabs-items', {
      ref: 'content'
    }, [this.$slots.content])

    return h('div', {
      'class': this.classes
    }, [this.$slots.default, tabs, items])
  }
}
