import {
  createSimpleFunctional
} from '../../util/helpers'

import Tabs from './Tabs.vue'
import TabItem from './TabItem'
import TabContent from './TabContent.vue'
import TabsTabs from './TabsTabs.vue'
const TabsSlider = createSimpleFunctional('tabs__slider')

export default {
  TabItem,
  Tabs,
  TabContent,
  TabsTabs,
  TabsSlider
}
