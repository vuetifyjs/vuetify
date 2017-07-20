import {
  createSimpleFunctional
} from '~util/helpers'

import VTabs from './VTabs'
import VTabsItem from './VTabsItem'
import VTabsContent from './VTabsContent'
import VTabsBar from './VTabsBar'
const VTabsSlider = createSimpleFunctional('tabs__slider', 'li')

const VTabsItems = {
  name: 'v-tabs-items',

  render (h) {
    return h('div', { 'class': { 'tabs__items': true } }, [this.$slots.default])
  }
}

export default {
  VTabsItem,
  VTabsItems,
  VTabs,
  VTabsContent,
  VTabsBar,
  VTabsSlider
}
