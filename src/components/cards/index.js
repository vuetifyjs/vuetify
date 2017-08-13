import { createSimpleFunctional } from '../../util/helpers'
import VCard from './VCard'
import VCardMedia from './VCardMedia'
import VCardTitle from './VCardTitle'

export default function install (Vue) {
  const VCardActions = createSimpleFunctional('card__actions')
  const VCardText = createSimpleFunctional('card__text')

  Vue.component('v-card', VCard)
  Vue.component('v-card-media', VCardMedia)
  Vue.component('v-card-title', VCardTitle)
  Vue.component('v-card-actions', VCardActions)
  Vue.component('v-card-text', VCardText)
}
