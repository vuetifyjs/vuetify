import Tabs from './Tabs'
import TabItem from './TabItem'
import TabContent from './TabContent'
import TabsTabs from './TabsTabs'
import TabsSlider from './TabsSlider'

const TabsItems = {
  name: 'tabs__items',
  functional:true,
  render (h,ctx) {
    return h('div', { 'class': { 'tabs__items': true }}, [ctx.children])
  }
}

//Possible adjustment only import and export Tabs, TabItem and TabContent
//Let Tabs import the other components directly 

export default {
  TabItem,
  TabsItems,
  Tabs,
  TabContent,
  TabsTabs,
  TabsSlider
}
