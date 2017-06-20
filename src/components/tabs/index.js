import {
  createSimpleFunctional
} from '../../util/helpers'

import Tabs from './Tabs'
import TabsItem from './TabsItem'
import TabsContent from './TabsContent'
import TabsBar from './TabsBar'
const TabsSlider = createSimpleFunctional('tabs__slider', 'li')

const TabsItems = {
  name: 'tabs-items',

  render (h) {
    return h('div', { 'class': { 'tabs__items': true } }, [this.$slots.default])
  }
}

export default {
  TabsItem,
  TabsItems,
  Tabs,
  TabsContent,
  TabsBar,
  TabsSlider
}
