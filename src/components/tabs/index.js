import {
  createSimpleFunctional
} from '../../util/helpers'

import Tab from './Tab.vue'
import TabsItem from './TabsItem.vue'
const Tabs = createSimpleFunctional('tabs')
const TabsTabs = createSimpleFunctional('tabs__tabs')
const TabsItems = createSimpleFunctional('tabs__items')

export default {
  Tab,
  Tabs,
  TabsItem,
  TabsItems,
  TabsTabs
}