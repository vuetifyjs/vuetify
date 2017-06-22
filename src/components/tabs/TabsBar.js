export default {
  name: 'tabs-bar',

  data () {
    return {
      resizeDebounce: null,
      isOverflowing: false,
      scrollOffset: 0
    }
  },

  props: {
    mobile: Boolean
  },

  computed: {
    classes () {
      return {
        'tabs__bar': true,
        'tabs__bar--mobile': this.mobile
      }
    },
    containerClasses () {
      return {
        'tabs__container': true,
        'tabs__container--overflow': this.isOverflowing
      }
    },
    containerStyles () {
      // fix min/max values
      return {
        'transform': `translateX(-${this.scrollOffset}px)`
      }
    }
  },

  methods: {
    scrollLeft () {
      this.scrollOffset -= 150
    },
    scrollRight () {
      this.scrollOffset += 150
    },
    resize () {
      clearTimeout(this.resizeDebounce)

      this.resizeDebounce = setTimeout(() => {
        this.isOverflowing = this.$refs.container.clientWidth < this.$refs.container.scrollWidth
      }, 50)
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      window.addEventListener('resize', this.resize, { passive: true })
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize, { passive: true })
  },

  render (h) {
    const container = h('ul', {
      'class': this.containerClasses,
      'style': this.containerStyles,
      ref: 'container'
    }, this.$slots.default)

    const left = h('v-icon', {
      props: {
        left: true
      },
      directives: [{
        name: 'ripple',
        value: ''
      }],
      on: {
        click: this.scrollLeft
      }
    }, 'chevron_left')

    const right = h('v-icon', {
      props: {
        right: true
      },
      directives: [{
        name: 'ripple',
        value: ''
      }],
      on: {
        click: this.scrollRight
      }
    }, 'chevron_right')

    const wrapper = h('div', { class: 'tabs__wrapper' }, [container])

    return h('div', {
      'class': this.classes
    }, [this.isOverflowing && left, wrapper, this.isOverflowing && right])
  }
}
