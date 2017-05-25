import { createSimpleFunctional } from '../../util/helpers'

import List from './List'
import ListGroup from './ListGroup'
import ListTile from './ListTile'
import ListTileAction from './ListTileAction'

const ListItem = createSimpleFunctional('list__item', 'li')
const ListTileActionText = createSimpleFunctional('list__tile__action-text', 'span')
const ListTileAvatar = createSimpleFunctional('list__tile__avatar', 'v-avatar')
const ListTileContent = createSimpleFunctional('list__tile__content', 'div')
const ListTileTitle = createSimpleFunctional('list__tile__title', 'div')
const ListTileSubTitle = createSimpleFunctional('list__tile__sub-title', 'div')

export default {
  List,
  ListItem,
  ListTile,
  ListGroup,
  ListTileAction,
  ListTileActionText,
  ListTileAvatar,
  ListTileContent,
  ListTileTitle,
  ListTileSubTitle
}
