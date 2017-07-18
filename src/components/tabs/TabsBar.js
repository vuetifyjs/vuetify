import Resizable from '~mixins/resizable'
import Icon from '~components/icons/Icon'

export default {
  name: 'tabs-bar',

  mixins: [Resizable],

  inject: ['isScrollable', 'isMobile'],

  data () {
    return {
      resizeDebounce: null,
      isOverflowing: false,
      scrollOffset: 0,
      itemOffset: 0,
      startX: 0
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

  mounted () {
    this.$vuetify.load(() => {
      this.onResize()
    })
  },

  methods: {
    genContainer () {
      return this.$createElement('ul', {
        'class': this.containerClasses,
        'style': this.containerStyles,
        ref: 'container'
      }, this.$slots.default)
    },
    genIcon (direction) {
      return this.$createElement(Icon, {
        props: { [`${direction}`]: true },
        style: { display: 'inline-flex' },
        on: {
          click: this[`scroll${direction.charAt(0).toUpperCase() + direction.slice(1)}`]
        }
      }, `chevron_${direction}`)
    },
    genWrapper () {
      return this.$createElement('div', {
        class: this.wrapperClasses,
        directives: [{
          name: 'touch',
          value: {
            start: this.start,
            move: this.move,
            end: this.end
          }
        }]
      }, [this.genContainer()])
    },
    start (e) {
      this.startX = this.scrollOffset + e.touchstartX
      this.$refs.container.style.transition = 'none'
    },
    move (e) {
      const offset = this.startX - e.touchmoveX
      this.scrollOffset = offset
    },
    end (e) {
      this.$refs.container.style.transition = null
      if (this.scrollOffset < 0) {
        this.scrollOffset = 0
      } else if (this.scrollOffset >= this.$refs.container.scrollWidth) {
        const lastItem = this.$refs.container.children[this.$refs.container.children.length - 1]
        this.scrollOffset = this.$refs.container.scrollWidth - lastItem.clientWidth
      }
    },
    scrollLeft () {
      const { offset, index } = this.newOffset('Left')
      this.scrollOffset = offset
      this.itemOffset = index
    },
    scrollRight () {
      const { offset, index } = this.newOffset('Right')
      this.scrollOffset = offset
      this.itemOffset = index
    },
    onResize () {
      clearTimeout(this.resizeDebounce)

      this.resizeDebounce = setTimeout(() => {
        this.isOverflowing = this.$refs.container.clientWidth < this.$refs.container.scrollWidth
      }, 50)
    },
    newOffset (direction) {
      return this[`newOffset${direction}`](this.scrollOffset, this.itemOffset)
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

  render (h) {
    return h('div', {
      'class': this.classes
    }, [
      this.genWrapper(),
      this.leftIconVisible ? this.genIcon('left') : null,
      this.rightIconVisible ? this.genIcon('right') : null
    ])
  }
}
