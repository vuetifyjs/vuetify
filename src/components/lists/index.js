import { createSimpleFunctional } from '../../util/helpers'

const List = createSimpleFunctional('list', 'ul')
const ListItemAction = createSimpleFunctional('list__item__action', 'div')
const ListItemActionText = createSimpleFunctional('list__item__action-text', 'span')
const ListItemAvatar = createSimpleFunctional('list__item__avatar', 'div')
const ListItemContent = createSimpleFunctional('list__item__content', 'div')
const ListItemTitle = createSimpleFunctional('list__item__title', 'div')
const ListItem = {
  functional: true,

  render (h, { data, children }) {
    const a = [h('a', { attrs: { href: 'javascript:;' }, staticClass: 'list__item' }, children)]

    if (data.attrs && data.attrs.disabled) {
      data.staticClass = data.staticClass ? `disabled ${data.staticClass}` : 'disabled'
      delete data.attrs.disabled
    }

    return h('li', data, a)
  }
}

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
  ListItemAction,
  ListItemActionText,
  ListItemAvatar,
  ListItemContent,
  ListItemTitle,
  ListItemSubTitle
}