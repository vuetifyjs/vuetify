import VIcon from '../VIcon'

import Resize from '../../directives/resize'
import Touch from '../../directives/touch'

export default {
  name: 'v-tabs-bar',

  directives: {
    Resize,
    Touch
  },

  provide () {
    return {
      addTabItem: (action, toggle, el) => {
        this.registerTabItem(action, toggle, el)
        this.onResize()
      },
      removeTabItem: (action) => {
        this.unregisterTabItem(action)
        this.onResize()
      }
    }
  },

  inject: ['isScrollable', 'isMobile', 'registerTabItem', 'unregisterTabItem'],

  data () {
    return {
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
      return !this.isMobile() &&
        this.isScrollable() &&
        this.isOverflowing &&
        this.scrollOffset > 0
    },
    rightIconVisible () {
      if (this.isMobile() ||
        !this.isScrollable() ||
        !this.isOverflowing) return

      // Check one scroll ahead to know the width of right-most item
      const container = this.$refs.container
      const item = this.newOffsetRight(this.scrollOffset, this.itemOffset)
      const itemWidth = item && container.children[item.index].clientWidth || 0
      const scrollOffset = this.scrollOffset + container.clientWidth

      return container.scrollWidth - scrollOffset > itemWidth * 0.30
    }
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
      const capitalize = direction.charAt(0).toUpperCase() + direction.slice(1)
      return this.$createElement(VIcon, {
        props: { [`${direction}`]: true },
        style: { display: 'inline-flex' },
        on: {
          click: this[`scroll${capitalize}`]
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
      this.onResize()
      const container = this.$refs.container
      const scrollWidth = container.scrollWidth - this.$el.clientWidth / 2
      container.style.transition = null

      if (this.scrollOffset < 0 || !this.isOverflowing) {
        this.scrollOffset = 0
      } else if (this.scrollOffset >= scrollWidth) {
        const lastItem = container.children[container.children.length - 1]
        this.scrollOffset = scrollWidth - lastItem.clientWidth
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
      if (this._isDestroyed) return

      const container = this.$refs.container
      this.isOverflowing = container.clientWidth < container.scrollWidth
    },
    newOffset (direction) {
      return this[`newOffset${direction}`](this.scrollOffset, this.itemOffset)
    },
    newOffsetLeft (currentOffset, currentIndex) {
      const container = this.$refs.container
      const items = container.children
      let offset = 0

      for (let index = currentIndex - 1; index >= 0; index--) {
        if (!items[index].classList.contains('tabs__slider')) {
          const newOffset = offset + items[index].clientWidth
          if (newOffset >= container.clientWidth) {
            return { offset: currentOffset - offset, index: index + 1 }
          }
          offset = newOffset
        }
      }

      return { offset: 0, index: 0 }
    },
    newOffsetRight (currentOffset, currentIndex) {
      const container = this.$refs.container
      const items = container.children
      let offset = currentOffset

      for (let index = currentIndex; index < items.length; index++) {
        if (!items[index].classList.contains('tabs__slider')) {
          const newOffset = offset + items[index].clientWidth
          if (newOffset > currentOffset + container.clientWidth) {
            return { offset, index }
          }
          offset = newOffset
        }
      }

      return null
    }
  },

  render (h) {
    return h('div', {
      'class': this.classes,
      directives: [{
        name: 'resize',
        value: this.onResize
      }]
    }, [
      this.genWrapper(),
      this.leftIconVisible ? this.genIcon('left') : null,
      this.rightIconVisible ? this.genIcon('right') : null
    ])
  }
}
