import {
  createSimpleFunctional
} from '../../util/helpers'

import Tab from './Tab.vue'
import TabContent from './TabContent.vue'
const Tabs = createSimpleFunctional('tabs')
const TabsContainer = createSimpleFunctional('tabs__container')
const TabsContentContainer = createSimpleFunctional('tabs__content-container')

export default {
  Tab,
  TabsContainer,
  TabContent,
  TabsContentContainer,
  Tabs
}