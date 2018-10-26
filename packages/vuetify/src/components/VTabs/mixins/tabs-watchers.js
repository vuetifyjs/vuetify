/**
 * Tabs watchers
 *
 * @mixin
 */
/* @vue/component */
export default {
  watch: {
    activeTab (val, oldVal) {
      this.setOverflow()

      if (!val) return

      this.tabItems && this.tabItems(
        this.getValue(val, this.items.indexOf(val))
      )

      // Do nothing for first tab
      // is handled from isBooted
      // watcher
      if (oldVal == null) return

      this.updateTabsView()
    },
    alignWithTitle: 'callSlider',
    centered: 'callSlider',
    fixedTabs: 'callSlider',
    hasArrows (val) {
      if (!val) this.scrollOffset = 0
    },
    /* @deprecate */
    internalValue (val) {
      /* istanbul ignore else */
      if (!this.$listeners['input']) return

      this.$emit('input', val)
    },
    lazyValue: 'updateTabs',
    right: 'callSlider',
    '$vuetify.application.left': 'onResize',
    '$vuetify.application.right': 'onResize',
    scrollOffset (val) {
      this.$refs.container.style.transform = `translateX(${-val}px)`
      if (this.hasArrows) {
        this.prevIconVisible = this.checkPrevIcon()
        this.nextIconVisible = this.checkNextIcon()
      }
    }
  }
}
