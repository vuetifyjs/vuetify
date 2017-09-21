import {
  createSimpleFunctional
} from '../../util/helpers'

import VTabs from './VTabs'
import VTabsItem from './VTabsItem'
import VTabsItems from './VTabsItemS'
import VTabsContent from './VTabsContent'
import VTabsBar from './VTabsBar'

VTabs.install = function install (Vue) {
  const VTabsSlider = createSimpleFunctional('tabs__slider', 'li')

  Vue.component(VTabs.name, VTabs)
  Vue.component(VTabsBar.name, VTabsBar)
  Vue.component(VTabsContent.name, VTabsContent)
  Vue.component(VTabsItem.name, VTabsItem)
  Vue.component(VTabsSlider.name, VTabsSlider)
  Vue.component(VTabsItems.name, VTabsItems)
}

export default VTabs
