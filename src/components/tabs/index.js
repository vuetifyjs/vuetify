import {
  createSimpleFunctional
} from '../../util/helpers'

import Tab from './Tab.vue'
import Tabs from './Tabs.vue'
import TabsItem from './TabsItem.vue'
const TabsItems = createSimpleFunctional('tabs__items')
const TabsTabs = createSimpleFunctional('tabs__tabs')
const TabsSlider = createSimpleFunctional('tabs__slider')

export default {
  Tab,
  Tabs,
  TabsItem,
  TabsItems,
  TabsTabs,
  TabsSlider
}