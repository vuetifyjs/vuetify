import {
  createSimpleFunctional
} from '../../util/helpers'

import Tabs from './Tabs.vue'
import TabItem from './TabItem'
import TabContent from './TabContent.vue'
import TabsTabs from './TabsTabs.vue'
const TabsSlider = createSimpleFunctional('tabs__slider')

const TabsItems = {
  render (h) {
    const data = {
      'class': {
        'tabs__items': true
      }
    }

    return h('div', data, [this.$slots.default])
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
