/**
 * Tabs computed
 *
 * @mixin
 */
export default {
  computed: {
    activeIndex () {
      return this.tabs.findIndex(tab => tab.id === this.lazyValue)
    },
    activeTab () {
      if (!this.tabs.length) return undefined

      return this.tabs[this.activeIndex]
    },
    classes () {
      return {
        'tabs--align-with-title': this.alignWithTitle,
        'tabs--centered': this.centered,
        'tabs--right': this.right,
        'tabs--fixed-tabs': this.fixedTabs,
        'tabs--grow': this.grow,
        'tabs--icons-and-text': this.iconsAndText,
        'tabs--is-mobile': this.isMobile,
        'tabs--overflow': this.isOverflowing,
        'tabs--show-arrows': this.showArrows && this.isOverflowing
      }
    },
    computedHeight () {
      if (this.height) return this.height

      return this.iconsAndText ? 72 : 48
    },
    containerStyles () {
      return {
        height: `${parseInt(this.computedHeight)}px`
      }
    },
    inputValue: {
      get () {
        return this.lazyValue
      },
      set (val) {
        this.lazyValue = val
        this.$emit('input', val)
      }
    },
    isMobile () {
      return this.$vuetify.breakpoint.width < this.mobileBreakPoint
    },
    prependIconVisible () {
      return this.isOverflowing &&
        this.scrollOffset > 0
    },
    appendIconVisible () {
      if (!this.isOverflowing) return

      // Check one scroll ahead to know the width of right-most item
      const container = this.$refs.container
      const item = this.newOffsetAppend(this.scrollOffset, this.itemOffset)
      const itemWidth = item && container.children[item.index].clientWidth || 0
      const scrollOffset = this.scrollOffset + container.clientWidth

      return container.scrollWidth - scrollOffset > itemWidth * 0.30
    },
    sliderStyles () {
      return {
        left: `${this.sliderLeft}px`,
        transition: this.sliderLeft != null ? null : 'none',
        width: `${this.sliderWidth}%`
      }
    },
    target () {
      return this.activeTab
        ? this.activeTab.id
        : null
    }
  }
}
