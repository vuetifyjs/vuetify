import { createSimpleFunctional } from '../../util/helpers'
import { deprecate } from '../../util/console'

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

const VListTile = VListItem.extend({
  mounted () { deprecate('v-list-tile', 'v-list-item') }
})
const VListTileAction = VListItemAction.extend({
  mounted () { deprecate('v-list-tile-action', 'v-list-item-action') }
})
const VListTileAvatar = VListItemAvatar.extend({
  mounted () { deprecate('v-list-tile-avatar', 'v-list-item-avatar') }
})
const VListTileIcon = VListItemIcon.extend({
  mounted () { deprecate('v-list-tile-icon', 'v-list-item-icon') }
})
const VListTileActionText = VListItemActionText.extend({
  render (h, context) {
    const render = VListItemActionText.options.render.call(this, h, context)

    deprecate('v-list-tile-action-text', 'v-list-item-action-text')

    return render
  }
})
const VListTileContent = VListItemContent.extend({
  render (h, context) {
    const render = VListItemContent.options.render.call(this, h, context)

    deprecate('v-list-tile-content', 'v-list-item-content')

    return render
  }
})
const VListTileTitle = VListItemTitle.extend({
  render (h, context) {
    const render = VListItemTitle.options.render.call(this, h, context)

    deprecate('v-list-tile-title', 'v-list-item-title')

    return render
  }
})
const VListTileSubTitle = VListItemSubtitle.extend({
  render (h, context) {
    const render = VListItemSubtitle.options.render.call(this, h, context)

    deprecate('v-list-tile-subtitle', 'v-list-item-subtitle')

    return render
  }
})

export {
  VList,
  VListGroup,
  VListItem,
  VListItemAction,
  VListItemAvatar,
  VListItemIcon,
  VListItemGroup,
  // Deprecated
  VListTile,
  VListTileAction,
  VListTileAvatar,
  VListTileIcon,
  VListTileActionText,
  VListTileContent,
  VListTileTitle,
  VListTileSubTitle
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
    VListItemSubtitle,
    VListItemTitle,
    // Deprecated
    VListTile,
    VListTileAction,
    VListTileAvatar,
    VListTileIcon,
    VListTileActionText,
    VListTileContent,
    VListTileTitle,
    VListTileSubTitle
  }
}
