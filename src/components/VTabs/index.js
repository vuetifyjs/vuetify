import VTabs from './VTabs'
import VTab from './VTab'
import VTabsItems from './VTabsItems'
import VTabItem from './VTabItem'
import VTabsSlider from './VTabsSlider'

export { VTabs, VTabItem, VTab, VTabsItems, VTabsSlider }

/* istanbul ignore next */
VTabs.install = function install (Vue) {
  Vue.component(VTabs.name, VTabs)
  Vue.component(VTab.name, VTab)
  Vue.component(VTabsItems.name, VTabsItems)
  Vue.component(VTabItem.name, VTabItem)
  Vue.component(VTabsSlider.name, VTabsSlider)
}

export default VTabs
