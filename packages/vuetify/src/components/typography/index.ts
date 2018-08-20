import {
  createSimpleFunctional
} from '../../util/helpers'

const VDisplay4 = createSimpleFunctional('display-4', 'div', 'v-display-4')
const VDisplay3 = createSimpleFunctional('display-3', 'div', 'v-display-3')
const VDisplay2 = createSimpleFunctional('display-2', 'div', 'v-display-2')
const VDisplay1 = createSimpleFunctional('display-1', 'div', 'v-display-1')
const VHeadline = createSimpleFunctional('headline', 'div', 'v-headline')
const VTitle = createSimpleFunctional('title', 'div', 'v-title')
const VSubtitle1 = createSimpleFunctional('subtitle-1', 'div', 'v-subtitle-1')
const VSubtitle2 = createSimpleFunctional('subtitle-2', 'div', 'v-subtitle-2')
const VBody1 = createSimpleFunctional('body-1', 'div', 'v-body-1')
const VBody2 = createSimpleFunctional('body-2', 'div', 'v-body-2')
const VCaption = createSimpleFunctional('caption', 'div', 'v-caption')
const VOverline = createSimpleFunctional('overline', 'div', 'v-overline')

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
