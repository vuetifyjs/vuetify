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
    isBooted: 'findActiveLink',
    value: 'tabClick',
    '$vuetify.application.left': 'onContainerResize',
    '$vuetify.application.right': 'onContainerResize'
  }
}
