import {
  createSimpleFunctional
} from '../../util/helpers'

import TabItem from './TabItem'
import Tabs from './Tabs.vue'
import TabsItem from './TabsItem.vue'
import TabsTabs from './TabsTabs.vue'
const TabsItems = createSimpleFunctional('tabs__items')
const TabsSlider = createSimpleFunctional('tabs__slider')

export default {
  TabItem,
  Tabs,
  TabsItem,
  TabsItems,
  TabsTabs,
  TabsSlider
}