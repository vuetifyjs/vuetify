import {
  createSimpleFunctional
} from '../../util/helpers'

import VTabs from './VTabs'
import VTabsItem from './VTabsItem'
import VTabsContent from './VTabsContent'
import VTabsBar from './VTabsBar'

export default function install (Vue) {
  const VTabsSlider = createSimpleFunctional('tabs__slider', 'li')
  const VTabsItems = {
    name: 'v-tabs-items',

    functional: true,

    render (h, { slots }) {
      return h('div', { 'class': { 'tabs__items': true } }, [slots().default])
    }
  }

  Vue.component('v-tabs', VTabs)
  Vue.component('v-tabs-bar', VTabsBar)
  Vue.component('v-tabs-content', VTabsContent)
  Vue.component('v-tabs-item', VTabsItem)
  Vue.component('v-tabs-slider', VTabsSlider)
  Vue.component('v-tabs-items', VTabsItems)
}
