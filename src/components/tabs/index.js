import {
  createSimpleFunctional
} from '../../util/helpers'

import Tab from './Tab.vue'
import Tabs from './Tabs.vue'
import TabsItem from './TabsItem.vue'
import TabsTabs from './TabsTabs.vue'
const TabsItems = createSimpleFunctional('tabs__items')
const TabsSlider = createSimpleFunctional('tabs__slider')

export default {
  Tab,
  Tabs,
  TabsItem,
  TabsItems,
  TabsTabs,
  TabsSlider
}