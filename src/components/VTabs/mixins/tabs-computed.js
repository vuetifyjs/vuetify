/**
 * Tabs computed
 *
 * @mixin
 */
export default {
  computed: {
    activeIndex () {
      return this.tabs.findIndex((tab, index) => {
        const id = tab.action === tab ? index.toString() : tab.action
        return id === this.lazyValue
      })
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
        // Always use strings
        val = val.toString()

        this.lazyValue = val
        this.$emit('input', val)
      }
    },
    isMobile () {
      return this.$vuetify.breakpoint.width < this.mobileBreakPoint
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
        ? this.activeTab.action
        : null
    }
  }
}
