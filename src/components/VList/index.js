import { createSimpleFunctional } from '../../util/helpers'

import VList from './VList'
import VListGroup from './VListGroup'
import VListTile from './VListTile'
import VListTileAction from './VListTileAction'

export { VList, VListGroup, VListTile, VListTileAction }
export const VListTileActionText = createSimpleFunctional('list__tile__action-text', 'span')
export const VListTileAvatar = createSimpleFunctional('list__tile__avatar', 'v-avatar')
export const VListTileContent = createSimpleFunctional('list__tile__content', 'div')
export const VListTileTitle = createSimpleFunctional('list__tile__title', 'div')
export const VListTileSubTitle = createSimpleFunctional('list__tile__sub-title', 'div')

VList.install = function install (Vue) {
  Vue.component(VList.name, VList)
  Vue.component(VListGroup.name, VListGroup)
  Vue.component(VListTile.name, VListTile)
  Vue.component(VListTileAction.name, VListTileAction)
  Vue.component('v-list-tile-action-text', VListTileActionText)
  Vue.component('v-list-tile-avatar', VListTileAvatar)
  Vue.component('v-list-tile-content', VListTileContent)
  Vue.component('v-list-tile-sub-title', VListTileSubTitle)
  Vue.component('v-list-tile-title', VListTileTitle)
}

export default VList
