import Themeable from '~mixins/themeable'
import Resizable from '~mixins/resizable'

export default {
  name: 'v-tabs',

  mixins: [Themeable, Resizable],

  provide () {
    return {
      slider: this.slider,
      tabClick: this.tabClick,
      isScrollable: () => this.scrollable,
      isMobile: () => this.isMobile
    }
  },

  data () {
    return {
      activators: [],
      activeIndex: null,
      isMobile: false,
      reverse: false,
      target: null,
      tabsSlider: null,
      targetEl: null,
      tabsContainer: null
    }
  },

  props: {
    centered: Boolean,
    fixed: Boolean,
    grow: Boolean,
    icons: Boolean,
    mobileBreakPoint: {
      type: [Number, String],
      default: 1024
    },
    value: String,
    scrollable: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes () {
      return {
        'tabs': true,
        'tabs--centered': this.centered,
        'tabs--fixed': this.fixed,
        'tabs--grow': this.grow,
        'tabs--icons': this.icons,
        'tabs--mobile': this.isMobile,
        'tabs--scroll-bars': this.scrollable,
        'theme--dark': this.dark,
        'theme--light': this.light
      }
    }
  },

  watch: {
    value () {
      this.tabClick(this.value)
    },
    activeIndex () {
      this.updateTabs()
      this.$emit('input', this.target)
      this.isBooted = true
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      const activators = this.$slots.activators

      if (!activators ||
        !activators.length ||
        !activators[0].componentInstance
      ) return

      const bar = activators[0].componentInstance.$children
      // // This is a workaround to detect if link is active
      // // when being used as a router or nuxt link
      const i = bar.findIndex(t => {
        return t.$el.firstChild.classList.contains('tabs__item--active')
      })

      const tab = this.value || (bar[i !== -1 ? i : 0] || {}).action

      tab && this.tabClick(tab) && this.onResize()
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize, { passive: true })
  },

  methods: {
    onResize () {
      this.isMobile = window.innerWidth < this.mobileBreakPoint
      this.slider()
    },
    slider (el) {
      this.tabsSlider = this.tabsSlider ||
        this.$el.querySelector('.tabs__slider')

      this.tabsContainer = this.tabsContainer ||
        this.$el.querySelector('.tabs__container')

      if (!this.tabsSlider || !this.tabsContainer) return

      this.targetEl = el || this.targetEl

      if (!this.targetEl) return

      // Gives DOM time to paint when
      // processing slider for
      // dynamic tabs
      this.$nextTick(() => {
        // #684 Calculate width as %
        const width = (
          this.targetEl.scrollWidth /
          this.tabsContainer.clientWidth *
          100
        )

        this.tabsSlider.style.width = `${width}%`
        this.tabsSlider.style.left = `${this.targetEl.offsetLeft}px`
      })
    },
    tabClick (target) {
      const setActiveIndex = index => {
        if (this.activeIndex === index) {
          // #762 update tabs display
          // In case tabs count got changed but activeIndex didn't
          this.updateTabs()
        } else {
          this.activeIndex = index
        }
      }

      this.target = target

      const content = this.$refs.content
      if (!content) {
        setActiveIndex(target)
        return
      }

      this.$nextTick(() => {
        const nextIndex = content.$children.findIndex(i => i.id === target)
        this.reverse = nextIndex < this.activeIndex
        setActiveIndex(nextIndex)
      })
    },
    updateTabs () {
      const activators = this.$slots.activators
      const content = this.$refs.content

      if (!activators ||
        !activators.length ||
        (activators.length &&
          !activators[0].componentInstance)) return

      activators[0].componentInstance.$children
        .filter(i => i.$options._componentTag === 'v-tabs-item')
        .forEach(i => i.toggle(this.target))

      content && content.$children.forEach((i) => {
        return i.toggle(this.target, this.reverse, this.isBooted)
      })
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
