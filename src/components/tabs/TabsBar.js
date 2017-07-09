import touch from '~util/touch'

export default {
  name: 'tabs-bar',

  inject: ['isScrollable', 'isMobile'],

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
        'transform': `translateX(${-this.scrollOffset}px)`
      }
    },
    leftIconVisible () {
      return !this.isMobile() && this.isScrollable() && this.isOverflowing && this.scrollOffset > 0
    },
    rightIconVisible () {
      if (this.isMobile() || !this.isScrollable() || !this.isOverflowing) return

      // Check one scroll ahead to know the width of right-most item
      const item = this.newOffsetRight(this.scrollOffset, this.itemOffset)
      const lastItemWidth = item && this.$refs.container.children[item.index].clientWidth || 0

      return this.$refs.container.scrollWidth - (this.scrollOffset + this.$refs.container.clientWidth) > lastItemWidth * 0.30
    }
  },

  methods: {
    scrollLeft () {
      var { offset, index } = this.newOffsetLeft(this.scrollOffset, this.itemOffset)
      this.scrollOffset = offset
      this.itemOffset = index
    },
    scrollRight () {
      var { offset, index } = this.newOffsetRight(this.scrollOffset, this.itemOffset)
      this.scrollOffset = offset
      this.itemOffset = index
    },
    resize () {
      clearTimeout(this.resizeDebounce)

      this.resizeDebounce = setTimeout(() => {
        this.isOverflowing = this.$refs.container.clientWidth < this.$refs.container.scrollWidth
      }, 50)
    },
    newOffsetLeft (currentOffset, currentIndex) {
      const items = this.$refs.container.children
      let offset = 0

      for (let index = currentIndex - 1; index >= 0; index--) {
        if (!items[index].classList.contains('tabs__slider')) {
          if (offset + items[index].clientWidth >= this.$refs.container.clientWidth) {
            return { offset: currentOffset - offset, index: index + 1 }
          }
          offset += items[index].clientWidth
        }
      }

      return { offset: 0, index: 0 }
    },
    newOffsetRight (currentOffset, currentIndex) {
      const items = this.$refs.container.children
      let offset = currentOffset

      for (let index = currentIndex; index < items.length; index++) {
        if (!items[index].classList.contains('tabs__slider')) {
          if (offset + items[index].clientWidth > currentOffset + this.$refs.container.clientWidth) {
            return { offset, index }
          }
          offset += items[index].clientWidth
        }
      }

      return null
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      window.addEventListener('resize', this.resize, { passive: true })
      this.resize()

      let startX = 0

      touch.bind(this.$refs.wrapper, true)
        .start((e) => {
          startX = this.scrollOffset + e.touchstartX
          this.$refs.container.style.transition = 'none'
        })
        .move((e) => {
          const offset = startX - e.touchmoveX
          this.scrollOffset = offset
        })
        .end((e) => {
          this.$refs.container.style.transition = null
          if (this.scrollOffset < 0) {
            this.scrollOffset = 0
          } else if (this.scrollOffset >= this.$refs.container.scrollWidth) {
            const lastItem = this.$refs.container.children[this.$refs.container.children.length - 1]
            this.scrollOffset = this.$refs.container.scrollWidth - lastItem.clientWidth
          }
        })
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize, { passive: true })
    touch.unbind(this.$refs.wrapper)
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

    const wrapper = h('div', { ref: 'wrapper', class: this.wrapperClasses }, [container])

    return h('div', {
      'class': this.classes
    }, [wrapper, left, right])
  }
}
