import { createSimpleFunctional } from '../../util/helpers'

import VList from './VList'
import VListGroup from './VListGroup'
import VListItem from './VListItem'
import VListItemGroup from './VListItemGroup'
import VListItemAction from './VListItemAction'
import VListItemAvatar from './VListItemAvatar'
import VListItemIcon from './VListItemIcon'

export const VListItemActionText = createSimpleFunctional('v-list-item__action-text', 'span')
export const VListItemContent = createSimpleFunctional('v-list-item__content', 'div')
export const VListItemTitle = createSimpleFunctional('v-list-item__title', 'div')
export const VListItemSubtitle = createSimpleFunctional('v-list-item__subtitle', 'div')

export {
  VList,
  VListGroup,
  VListItem,
  VListItemAction,
  VListItemAvatar,
  VListItemIcon,
  VListItemGroup,
}

export default {
  $_vuetify_subcomponents: {
    VList,
    VListGroup,
    VListItem,
    VListItemAction,
    VListItemActionText,
    VListItemAvatar,
    VListItemContent,
    VListItemGroup,
    VListItemIcon,
    VListItemSubtitle,
    VListItemTitle,
  },
}
