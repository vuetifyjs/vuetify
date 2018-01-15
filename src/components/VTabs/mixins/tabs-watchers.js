/**
 * Tabs watchers
 *
 * @mixin
 */
export default {
  watch: {
    activeTab (tab) {
      this.callSlider()

      if (!tab) return

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
      const tab = this.tabs.find(tab => tab.action === val) || this.tabs[val]

      if (!tab) return

      this.tabClick(tab)
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
