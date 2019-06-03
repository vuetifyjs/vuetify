// Components
import VToolbar from './VToolbar'
import VToolbarSideIcon from './VToolbarSideIcon'
import VAppBar from '../VAppBar/VAppBar'

// Utilities
import { createSimpleFunctional } from '../../util/helpers'
import rebuildSlots from '../../util/rebuildFunctionalSlots'
import dedupeModelListeners from '../../util/dedupeModelListeners'
import { deprecate } from '../../util/console'

// Types
import Vue, { VNode } from 'vue'

const VToolbarTitle = createSimpleFunctional('v-toolbar__title')
const VToolbarItems = createSimpleFunctional('v-toolbar__items')

/* @vue/component */
const wrapper = Vue.extend({
  functional: true,

  $_wrapperFor: VToolbar,

  props: {
    app: Boolean,
    /* @deprecated */
    card: Boolean,
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
      default: 300,
    },
    /* @deprecated */
    tabs: Boolean,
  },

  render (h, { props, data, slots }): VNode { // eslint-disable-line max-statements
    dedupeModelListeners(data)
    const children = rebuildSlots(slots(), h)

    data.attrs = data.attrs || {}

    if (props.app) {
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
      deprecate('<v-toolbar scroll-off-screen>', '<v-app-bar hide-on-scroll scroll-off-screen>')
      data.attrs.scrollOffScreen = props.scrollOffScreen
    }

    if (props.scrollTarget) {
      deprecate('<v-toolbar scroll-target>', '<v-app-bar scroll-target>')
      data.attrs.scrollTarget = props.scrollTarget
    }

    if (props.scrollThreshold !== 300) {
      deprecate('<v-toolbar scroll-threshold>', '<v-app-bar scroll-threshold>')
      data.attrs.scrollThreshold = props.scrollThreshold
    }

    if (props.card) {
      deprecate('<v-toolbar card>', '<v-toolbar flat>')
      data.attrs.flat = props.card
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
  },
})

export {
  wrapper as VToolbar,
  VToolbarSideIcon,
  VToolbarTitle,
  VToolbarItems,
}

export default {
  $_vuetify_subcomponents: {
    VToolbar,
    VToolbarItems,
    VToolbarTitle,
    VToolbarSideIcon,
  },
}
