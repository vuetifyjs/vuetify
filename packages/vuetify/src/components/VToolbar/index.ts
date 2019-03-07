import { createSimpleFunctional } from '../../util/helpers'
import rebuildSlots from '../../util/rebuildFunctionalSlots'
import dedupeModelListeners from '../../util/dedupeModelListeners'
import { deprecate } from '../../util/console'

import VToolbar from './VToolbar'
import VToolbarAction from './VToolbarAction'
import VToolbarSideIcon from './VToolbarSideIcon'
import VAppBar from '../VAppBar/VAppBar'

const VToolbarTitle = createSimpleFunctional('v-toolbar__title')
const VToolbarItems = createSimpleFunctional('v-toolbar__items')

/* @vue/component */
const wrapper = {
  functional: true,

  $_wrapperFor: VAppBar,

  props: {
    app: Boolean,
    clippedLeft: Boolean,
    clippedRight: Boolean,
    invertedScroll: Boolean,
    /* @deprecated */
    manualScroll: Boolean,
    /* @deprecated */
    scrollOffScreen: Boolean,
    scrollTarget: String,
    scrollThreshold: {
      type: Number,
      default: 300
    }
  },

  render (h, { props, data, slots, parent }) {
    dedupeModelListeners(data)
    const children = rebuildSlots(slots(), h)

    data.attrs = data.attrs || {}

    if (props.app) {
      deprecate('manual-scroll', 'value')
      deprecate('<v-toolbar app>', '<v-app-bar app>')
      data.attrs.app = props.app
    }

    if (props.manualScroll) {
      deprecate('manual-scroll', 'value')
      deprecate('<v-toolbar manual-scroll>', '<v-app-bar :value="false">')
      data.attrs.value = !props.manualScroll
    }

    if (props.clippedLeft) {
      deprecate('<v-toolbar clipped-left>', '<v-app-bar clipped-left>')
      data.attrs.clippedLeft = props.clippedLeft
    }

    if (props.clippedRight) {
      deprecate('<v-toolbar clipped-right>', '<v-app-bar clipped-right>')
      data.attrs.clippedRight = props.clippedRight
    }

    if (props.invertedScroll) {
      deprecate('<v-toolbar inverted-scroll>', '<v-app-bar inverted-scroll>')
      data.attrs.invertedScroll = props.invertedScroll
    }

    if (props.scrollOffScreen) {
      deprecate('<v-toolbar scroll-off-screen>', '<v-app-bar hide-on-scroll>')
      data.attrs.scrollOffScreen = props.scrollOffScreen
    }

    if (props.scrollTarget) {
      deprecate('<v-toolbar scroll-target>', '<v-app-bar scroll-target>')
      data.attrs.scrollTarget = props.scrollTarget
    }

    if (props.scrollThreshold) {
      deprecate('<v-toolbar scroll-threshold>', '<v-app-bar scroll-threshold>')
      data.attrs.scrollThreshold = props.scrollThreshold
    }

    if (
      props.app ||
      props.manualScroll ||
      props.clippedLeft ||
      props.clippedRight ||
      props.invertedScroll ||
      props.scrollOffScreen ||
      props.scrollTarget ||
      props.scrollThreshold
    ) {
      return h(VAppBar, data, children)
    }

    return h(VToolbar, data, children)
  }
}

export {
  wrapper as VToolbar,
  VToolbarAction,
  VToolbarSideIcon,
  VToolbarTitle,
  VToolbarItems
}

export default {
  $_vuetify_subcomponents: {
    VToolbar,
    VToolbarItems,
    VToolbarTitle,
    VToolbarAction,
    VToolbarSideIcon
  }
}
