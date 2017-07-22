import {
  createSimpleFunctional
} from '~util/helpers'
import VCard from './VCard'
import VCardMedia from './VCardMedia'
import VCardTitle from './VCardTitle'

const VCardActions = createSimpleFunctional('card__actions')
const VCardText = createSimpleFunctional('card__text')

export default {
  VCard,
  VCardActions,
  VCardMedia,
  VCardText,
  VCardTitle
}
