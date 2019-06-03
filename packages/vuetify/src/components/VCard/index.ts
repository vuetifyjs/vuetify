import { createSimpleFunctional } from '../../util/helpers'
import VCard from './VCard'
import VCardText from './VCardText'

const VCardActions = createSimpleFunctional('v-card__actions')
const VCardTitle = createSimpleFunctional('v-card__title')

export { VCard, VCardTitle, VCardActions, VCardText }

export default {
  $_vuetify_subcomponents: {
    VCard,
    VCardTitle,
    VCardActions,
    VCardText,
  },
}
