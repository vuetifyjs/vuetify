import VCard from './VCard'
import { createSimpleFunctional } from '../../util/helpers'

const VCardActions = createSimpleFunctional('v-card__actions')
const VCardSubtitle = createSimpleFunctional('v-card__subtitle')
const VCardText = createSimpleFunctional('v-card__text')
const VCardTitle = createSimpleFunctional('v-card__title')

export {
  VCard,
  VCardActions,
  VCardSubtitle,
  VCardText,
  VCardTitle,
}

export default {
  $_vuetify_subcomponents: {
    VCard,
    VCardActions,
    VCardSubtitle,
    VCardText,
    VCardTitle,
  },
}
