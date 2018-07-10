import { createSimpleFunctional } from '../../util/helpers'
import VCard from './VCard'
import VCardMedia from './VCardMedia'
import VCardTitle from './VCardTitle'
import Vue from 'vue'

const VCardActions = Vue.extend(createSimpleFunctional('v-card__actions'))
const VCardText = Vue.extend(createSimpleFunctional('v-card__text'))

export { VCard, VCardMedia, VCardTitle, VCardActions, VCardText }

/* istanbul ignore next */
VCard.install = function install (Vue) {
  Vue.component(VCard.options.name, VCard)
  Vue.component(VCardMedia.options.name, VCardMedia)
  Vue.component(VCardTitle.options.name, VCardTitle)
  Vue.component(VCardActions.options.name, VCardActions)
  Vue.component(VCardText.options.name, VCardText)
}

export default VCard
