export default {
  name: 'tabs-bar',

  inject: ['isScrollable'],

  data () {
    return {
      resizeDebounce: null,
      isOverflowing: false,
      scrollOffset: 0,
      itemOffset: 0
    }
  },

  computed: {
    classes () {
      return {
        'tabs__bar': true
      }
    },
    containerClasses () {
      return {
        'tabs__container': true
      }
    },
    wrapperClasses () {
      return {
        'tabs__wrapper': true,
        'tabs__wrapper--scrollable': this.isScrollable(),
        'tabs__wrapper--overflow': this.isOverflowing
      }
    },
    containerStyles () {
      return {
        'transform': `translateX(-${this.scrollOffset}px)`
      }
    },
    leftIconVisible () {
      return this.isScrollable() && this.isOverflowing && this.scrollOffset > 0
    },
    rightIconVisible () {
      if (!this.isScrollable() || !this.isOverflowing) return

      const remaining = this.$refs.container.scrollWidth - (this.scrollOffset + this.$refs.container.clientWidth)
      return remaining > (this.$refs.container.children[this.itemOffset].clientWidth * 0.25)
    }
  },

  methods: {
    scrollLeft () {
      this.scrollOffset = this.newOffsetLeft()
    },
    scrollRight () {
      this.scrollOffset = this.newOffsetRight()
    },
    resize () {
      clearTimeout(this.resizeDebounce)

      this.resizeDebounce = setTimeout(() => {
        this.isOverflowing = this.$refs.container.clientWidth < this.$refs.container.scrollWidth
      }, 50)
    },
    newOffsetLeft () {
      const items = this.$refs.container.children
      let offset = 0

      for (let i = this.itemOffset - 1; i >= 0; i--) {
        if (!items[i].classList.contains('tabs__slider')) {
          if (offset + items[i].clientWidth >= this.$refs.container.clientWidth) {
            this.itemOffset = i
            return this.scrollOffset - offset
          }
          offset += items[i].clientWidth
        }
      }

      this.itemOffset = 0
      return 0
    },
    newOffsetRight () {
      const items = this.$refs.container.children
      let offset = this.scrollOffset

      for (let i = this.itemOffset; i < items.length; i++) {
        if (!items[i].classList.contains('tabs__slider')) {
          if (offset + items[i].clientWidth > this.scrollOffset + this.$refs.container.clientWidth) {
            this.itemOffset = i
            return offset
          }
          offset += items[i].clientWidth
        }
      }

      return 0
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      window.addEventListener('resize', this.resize, { passive: true })
      this.resize()
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
      style: {
        display: this.leftIconVisible ? 'inline-flex' : 'none'
      },
      on: {
        click: this.scrollLeft
      }
    }, 'chevron_left')

    const right = h('v-icon', {
      props: {
        right: true
      },
      style: {
        display: this.rightIconVisible ? 'inline-flex' : 'none'
      },
      on: {
        click: this.scrollRight
      }
    }, 'chevron_right')

    const wrapper = h('div', { class: this.wrapperClasses }, [container])

    return h('div', {
      'class': this.classes
    }, [wrapper, left, right])
  }
}
