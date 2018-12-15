import { createSimpleFunctional } from '../../util/helpers'
import VCard from './VCard'
import VCardMedia from './VCardMedia'
import VCardTitle from './VCardTitle'

const VCardActions = createSimpleFunctional('v-card__actions')
const VCardText = createSimpleFunctional('v-card__text')

export { VCard, VCardMedia, VCardTitle, VCardActions, VCardText }

export default {
  $_vuetify_subcomponents: {
    VCard,
    VCardMedia,
    VCardTitle,
    VCardActions,
    VCardText
  }
}
