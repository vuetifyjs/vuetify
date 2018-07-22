import { createSimpleFunctional } from '../../util/helpers'
import VCard from './VCard'
import VCardMedia from './VCardMedia'
import VCardTitle from './VCardTitle'
import Vue from 'vue'

const VCardActions = Vue.extend(createSimpleFunctional('v-card__actions'))
const VCardText = Vue.extend(createSimpleFunctional('v-card__text'))

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
