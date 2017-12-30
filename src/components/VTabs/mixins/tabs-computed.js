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
    containerStyles () {
      return this.height ? {
        height: `${parseInt(this.height, 10)}px`
      } : null
    },
    hasArrows () {
      return (this.showArrows || !this.isMobile) && this.isOverflowing
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
      return this.scrollOffset > 0
    },
    appendIconVisible () {
      // Check one scroll ahead to know the width of right-most item
      const container = this.$refs.container
      const wrapper = this.$refs.wrapper

      return container.clientWidth > this.scrollOffset + wrapper.clientWidth
    },
    sliderStyles () {
      return {
        left: `${this.sliderLeft}px`,
        transition: this.sliderLeft != null ? null : 'none',
        width: `${this.sliderWidth}px`
      }
    },
    target () {
      return this.activeTab
        ? this.activeTab.id
        : null
    }
  }
}
