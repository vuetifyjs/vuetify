/**
 * Tabs watchers
 *
 * @mixin
 */
export default {
  watch: {
    activeTab (val) {
      this.callSlider()
      this.tabItems && this.tabItems(val.id)
    },
    alignWithTitle: 'callSlider',
    centered: 'callSlider',
    fixedTabs: 'callSlider',
    isBooted: 'findActiveLink',
    lazyValue: 'updateTabs',
    right: 'callSlider',
    value: 'tabClick',
    '$vuetify.application.left': 'onContainerResize',
    '$vuetify.application.right': 'onContainerResize',
    scrollOffset (val) {
      this.$refs.container.style.transform = `translateX(${-val}px)`
    }
  }
}
