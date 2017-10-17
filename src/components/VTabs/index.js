import VTabs from './VTabs'
import VTabsBar from './VTabsBar'
import VTabsContent from './VTabsContent'
import VTabsItem from './VTabsItem'
import VTabsItems from './VTabsItems'
import VTabsSlider from './VTabsSlider'

VTabs.install = function install (Vue) {
  Vue.component(VTabs.name, VTabs)
  Vue.component(VTabsBar.name, VTabsBar)
  Vue.component(VTabsContent.name, VTabsContent)
  Vue.component(VTabsItem.name, VTabsItem)
  Vue.component(VTabsItems.name, VTabsItems)
  Vue.component(VTabsSlider.name, VTabsSlider)
}

export default VTabs
