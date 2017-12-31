/**
 * Tabs watchers
 *
 * @mixin
 */
export default {
  watch: {
    activeTab (tab) {
      this.callSlider()

      const action = tab.action
      this.tabItems && this.tabItems(action === tab ? this.tabs.indexOf(tab).toString() : action)
    },
    alignWithTitle: 'callSlider',
    centered: 'callSlider',
    fixedTabs: 'callSlider',
    isBooted: 'findActiveLink',
    lazyValue: 'updateTabs',
    right: 'callSlider',
    value (val) {
      // Avoid duplicate value updates
      if (this.lazyValue !== val) this.tabClick(val)
    },
    '$vuetify.application.left': 'onContainerResize',
    '$vuetify.application.right': 'onContainerResize',
    scrollOffset (val) {
      this.$refs.container.style.transform = `translateX(${-val}px)`
      if (this.hasArrows) {
        this.prependIconVisible = this.checkPrependIcon()
        this.appendIconVisible = this.checkAppendIcon()
      }
    }
  }
}
