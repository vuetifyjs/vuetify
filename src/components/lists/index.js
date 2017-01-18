import { createSimpleFunctional } from '../../util/helpers'

import List from './List'
import ListGroup from './ListGroup.vue'
import ListTile from './ListTile'
import ListTileAction from './ListTileAction'

const ListItem = createSimpleFunctional('list__item', 'li')
const ListTileActionText = createSimpleFunctional('list__tile__action-text', 'span')
const ListTileAvatar = createSimpleFunctional('list__tile__avatar', 'div')
const ListTileContent = createSimpleFunctional('list__tile__content', 'div')
const ListTileTitle = createSimpleFunctional('list__tile__title', 'div')
const ListTileSubTitle = createSimpleFunctional('list__tile__sub-title', 'div')

const ListSubHeader = {
  functional: true,

  render (h, { data, children }) {
    let listClass = 'list__sub-header'

    if (
      (data.props && data.props.inset) ||
      (data.attrs && data.attrs.inset)
    ) {
      listClass += ' list__sub-header--inset'
    }

    data.staticClass = data.staticClass ? `${listClass} ${data.staticClass}` : listClass

    return h('li', data, children)
  }
}

export default {
  List,
  ListItem,
  ListTile,
  ListGroup,
  ListSubHeader,
  ListTileAction,
  ListTileActionText,
  ListTileAvatar,
  ListTileContent,
  ListTileTitle,
  ListTileSubTitle
}