import { createSimpleFunctional } from '../../util/helpers'

import VList from './VList'
import VListGroup from './VListGroup'
import VListTile from './VListTile'
import VListTileAction from './VListTileAction'
import VListTileAvatar from './VListTileAvatar'

export { VList, VListGroup, VListTile, VListTileAction, VListTileAvatar }
export const VListTileActionText = createSimpleFunctional('v-list__tile__action-text', 'span')
export const VListTileContent = createSimpleFunctional('v-list__tile__content', 'div')
export const VListTileTitle = createSimpleFunctional('v-list__tile__title', 'div')
export const VListTileSubTitle = createSimpleFunctional('v-list__tile__sub-title', 'div')

export default {
  $_vuetify_subcomponents: {
    VList,
    VListGroup,
    VListTile,
    VListTileAction,
    VListTileActionText,
    VListTileAvatar,
    VListTileContent,
    VListTileSubTitle,
    VListTileTitle
  }
}
