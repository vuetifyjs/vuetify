import { createSimpleFunctional } from '../../util/helpers'
import VCard from './VCard'
import VCardMedia from './VCardMedia'
import VCardTitle from './VCardTitle'

export { VCard, VCardMedia, VCardTitle }

VCard.install = function install (Vue) {
  const VCardActions = createSimpleFunctional('card__actions')
  const VCardText = createSimpleFunctional('card__text')

  Vue.component(VCard.name, VCard)
  Vue.component(VCardMedia.name, VCardMedia)
  Vue.component(VCardTitle.name, VCardTitle)
  Vue.component('v-card-actions', VCardActions)
  Vue.component('v-card-text', VCardText)
}

export default VCard
