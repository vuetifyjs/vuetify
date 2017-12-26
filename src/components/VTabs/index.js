import VTabs from './VTabs'
import VTabsContent from './VTabsContent'
import VTabsItem from './VTabsItem'
import VTabsItems from './VTabsItems'
import VTabsSlider from './VTabsSlider'

export { VTabs, VTabsContent, VTabsItem, VTabsItems, VTabsSlider }

/* istanbul ignore next */
VTabs.install = function install (Vue) {
  Vue.component(VTabs.name, VTabs)
  Vue.component(VTabsContent.name, VTabsContent)
  Vue.component(VTabsItem.name, VTabsItem)
  Vue.component(VTabsItems.name, VTabsItems)
  Vue.component(VTabsSlider.name, VTabsSlider)
}

export default VTabs
