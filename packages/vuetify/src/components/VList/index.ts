import { createSimpleFunctional } from '../../util/helpers'

import VList from './VList'
import VListGroup from './VListGroup'
import VListTile from './VListTile'
import VListTileAction from './VListTileAction'
import VListTileAvatar from './VListTileAvatar'
import VListTileIcon from './VListTileIcon'

export const VListTileActionText = createSimpleFunctional('v-list__tile__action-text', 'span')
export const VListTileContent = createSimpleFunctional('v-list__tile__content', 'div')
export const VListTileTitle = createSimpleFunctional('v-list__tile__title', 'div')
export const VListTileSubTitle = createSimpleFunctional('v-list__tile__subtitle', 'div')

export {
  VList,
  VListGroup,
  VListTile,
  VListTileAction,
  VListTileAvatar,
  VListTileIcon
}

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
