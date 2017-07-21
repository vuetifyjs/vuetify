import { createSimpleFunctional } from '~util/helpers'

import VList from './VList'
import VListGroup from './VListGroup'
import VListTile from './VListTile'
import VListTileAction from './VListTileAction'

export const VListTileActionText = createSimpleFunctional('list__tile__action-text', 'span')
export const VListTileAvatar = createSimpleFunctional('list__tile__avatar', 'v-avatar')
export const VListTileContent = createSimpleFunctional('list__tile__content', 'div')
export const VListTileTitle = createSimpleFunctional('list__tile__title', 'div')
export const VListTileSubTitle = createSimpleFunctional('list__tile__sub-title', 'div')

export default {
  VList,
  VListTile,
  VListGroup,
  VListTileAction,
  VListTileActionText,
  VListTileAvatar,
  VListTileContent,
  VListTileTitle,
  VListTileSubTitle
}
