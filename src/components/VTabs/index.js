import {
  createSimpleFunctional
} from '../../util/helpers'

import VTabs from './VTabs'
import VTabsItem from './VTabsItem'
import VTabsContent from './VTabsContent'
import VTabsBar from './VTabsBar'

VTabs.install = function install (Vue) {
  const VTabsSlider = createSimpleFunctional('tabs__slider', 'li')
  const VTabsItems = {
    name: 'v-tabs-items',

    functional: true,

    render (h, { slots }) {
      return h('div', { 'class': { 'tabs__items': true } }, [slots().default])
    }
  }

  Vue.component(VTabs.name, VTabs)
  Vue.component(VTabsBar.name, VTabsBar)
  Vue.component(VTabsContent.name, VTabsContent)
  Vue.component(VTabsItem.name, VTabsItem)
  Vue.component(VTabsSlider.name, VTabsSlider)
  Vue.component(VTabsItems.name, VTabsItems)
}

export default VTabs
