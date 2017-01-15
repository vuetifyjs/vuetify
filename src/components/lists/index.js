import { createSimpleFunctional } from '../../util/helpers'

import ListItem from './ListItem'
import ListGroup from './ListGroup.vue'

const List = {
  name: 'list',

  render (createElement) {
    let data = { 
      'class': 'list',
      attrs: {
        'data-uid': this._uid
      }
    }

    return createElement('ul', data, this.$slots.default)
  }
}

const ListItemAction = createSimpleFunctional('list__item__action', 'div')
const ListItemActionText = createSimpleFunctional('list__item__action-text', 'span')
const ListItemAvatar = createSimpleFunctional('list__item__avatar', 'div')
const ListItemContent = createSimpleFunctional('list__item__content', 'div')
const ListItemTitle = createSimpleFunctional('list__item__title', 'div')

const ListItemSubTitle = {
  functional: true,

  render (h, { data, children }) {
    let listClass = 'list__item__sub-title'

    if (data.attrs && data.attrs.clamp) {
      listClass += ' list__item__sub-title--clamp'
    }

    data.staticClass = data.staticClass ? `${listClass} ${data.staticClass}` : listClass

    return h('div', data, children)
  }
}

export default {
  List,
  ListItem,
  ListGroup,
  ListItemAction,
  ListItemActionText,
  ListItemAvatar,
  ListItemContent,
  ListItemTitle,
  ListItemSubTitle
}