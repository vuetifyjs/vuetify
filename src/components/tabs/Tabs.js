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
      tabsSlider: null,
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
    value: String
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

      const activators = this.$slots.activators

      if (!activators || !activators.length || !activators[0].componentInstance.$children) return

      activators[0].componentInstance.$children
        .filter(i => i.$options._componentTag === 'v-tabs-item')
        .forEach(i => {
          i.toggle(this.target)

          i.isActive && this.slider(i.$el)
        })

      this.$refs.content && this.$refs.content.$children.forEach(i => i.toggle(this.target, this.reverse, this.isBooted))
      this.$emit('input', this.target)
      this.isBooted = true
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      window.addEventListener('resize', this.resize, false)

      const activators = this.$slots.activators

      if (!activators || !activators.length || !activators[0].componentInstance.$children) return

      const bar = activators[0].componentInstance.$children
      // // This is a workaround to detect if link is active
      // // when being used as a router or nuxt link
      const i = bar.findIndex(t => {
        return t.$el.firstChild.classList.contains('tabs__item--active')
      })

      const tab = this.value || (bar[i !== -1 ? i : 0] || {}).action

      // Temp fix for slider loading issue
      setTimeout(() => {
        tab && this.tabClick(tab) && this.resize()
      }, 250)
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
      this.tabsSlider = this.tabsSlider || this.$el.querySelector('.tabs__slider')

      if (!this.tabsSlider) return

      this.targetEl = el || this.targetEl

      if (!this.targetEl) return

      // Gives DOM time to paint when
      // processing slider for
      // dynamic tabs
      this.$nextTick(() => {
        this.tabsSlider.style.width = `${this.targetEl.scrollWidth}px`
        this.tabsSlider.style.left = `${this.targetEl.offsetLeft}px`
      })
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
    const content = []
    const slot = []
    const iter = (this.$slots.default || [])

    iter.forEach(c => {
      if (!c.componentOptions) slot.push(c)
      else if (c.componentOptions.tag === 'v-tabs-content') content.push(c)
      else slot.push(c)
    })

    const tabs = content.length ? h('v-tabs-items', {
      ref: 'content'
    }, content) : null

    return h('div', {
      'class': this.classes
    }, [slot, this.$slots.activators, tabs])
  }
}
