import { createSimpleFunctional } from '../../util/helpers'

const List = createSimpleFunctional('list', 'ul')
const ListItem = createSimpleFunctional('list__item', 'li')
const ListItemTitle = createSimpleFunctional('list__item-title', 'span')
const ListItemSubTitle = createSimpleFunctional('list__item-sub-title', 'span')
const ListItemAction = createSimpleFunctional('list__item-action', 'span')
const ListItemActionTitle = createSimpleFunctional('list__item-action-title', 'span')
const ListItemIcon = createSimpleFunctional('list__item-icon', 'v-icon')
const ListItemAvatar = createSimpleFunctional('list__item-avatar', 'v-icon')

export default {
  List,
  ListItem,
  ListItemIcon,
  ListItemAvatar,
  ListItemTitle,
  ListItemSubTitle,
  ListItemAction,
  ListItemActionTitle
}