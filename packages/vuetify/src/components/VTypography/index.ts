// Libraries
import Vue from 'vue'

// Types
import { VNode } from 'vue/types'

function Typography (
  c: string,
  name?: string
) {
  return Vue.extend({
    name: name || c.replace(/__/g, '-'),

    functional: true,

    props: {
      tag: {
        type: String,
        default: 'div'
      }
    },

    render (h, { data, children, props }): VNode {
      data.staticClass = (`${c} ${data.staticClass || ''}`).trim()

      return h(props.tag, data, children)
    }
  })
}

const VDisplay4 = Typography('display-4', 'v-display-4')
const VDisplay3 = Typography('display-3', 'v-display-3')
const VDisplay2 = Typography('display-2', 'v-display-2')
const VDisplay1 = Typography('display-1', 'v-display-1')
const VHeadline = Typography('headline', 'v-headline')
const VTitle = Typography('title', 'v-title')
const VSubtitle1 = Typography('subtitle-1', 'v-subtitle-1')
const VSubtitle2 = Typography('subtitle-2', 'v-subtitle-2')
const VBody1 = Typography('body-1', 'v-body-1')
const VBody2 = Typography('body-2', 'v-body-2')
const VCaption = Typography('caption', 'v-caption')
const VOverline = Typography('overline', 'v-overline')

export {
  VDisplay4,
  VDisplay3,
  VDisplay2,
  VDisplay1,
  VHeadline,
  VTitle,
  VSubtitle1,
  VSubtitle2,
  VBody1,
  VBody2,
  VCaption,
  VOverline
}

export default {
  $_vuetify_subcomponents: {
    VDisplay4,
    VDisplay3,
    VDisplay2,
    VDisplay1,
    VHeadline,
    VTitle,
    VSubtitle1,
    VSubtitle2,
    VBody1,
    VBody2,
    VCaption,
    VOverline
  }
}
