import {
  createSimpleFunctional
} from '../../util/helpers'

import Tabs from './Tabs'
import TabItem from './TabItem'
import TabContent from './TabContent'
import TabsTabs from './TabsTabs'
const TabsSlider = createSimpleFunctional('tabs__slider')

const TabsItems = {
  name: 'tabs__items',

  render (h) {
    return h('div', { 'class': { 'tabs__items': true }}, [this.$slots.default])
  }
}

export default {
  TabItem,
  TabsItems,
  Tabs,
  TabContent,
  TabsTabs,
  TabsSlider
}
