import {
  createSimpleFunctional
} from '../../util/helpers'

import Sidebar from './Sidebar.vue'
import SidebarGroup from './SidebarGroup.vue'
import SidebarItem from './SidebarItem'
import SidebarItems from './SidebarItems.vue'

const SidebarItemHeader = createSimpleFunctional('sidebar__item-header', 'li')

export default {
  Sidebar,
  SidebarGroup,
  SidebarItem,
  SidebarItems,
  SidebarItemHeader
}