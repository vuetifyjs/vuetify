import { createSimpleFunctional } from '../../util/helpers'

import VList from './VList'
import VListGroup from './VListGroup'
import VListItem from './VListItem'
import VListItemAvatar from './VListItemAvatar'
import VListItemAction from './VListItemAction'
import VListItemIcon from './VListItemIcon'

export { VList, VListGroup, VListItem, VListItemAction, VListItemIcon }
export const VListItemContent = createSimpleFunctional('v-list__item__content', 'div')

export default {
  $_vuetify_subcomponents: {
    VList,
    VListGroup,
    VListItem,
    VListItemAvatar,
    VListItemAction,
    VListItemContent,
    VListItemIcon
  }
}
