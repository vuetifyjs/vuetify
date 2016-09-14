import Card from './Card.vue'
import CardTitle from './CardTitle.vue'
import { 
  createSimpleFunctional
} from '../../util/helpers'

const CardMenu = createSimpleFunctional('card__menu')
const CardStack = createSimpleFunctional('card__stack')
const CardActions = createSimpleFunctional('card__actions')
const CardText = createSimpleFunctional('card__text')
const CardTitleActions = createSimpleFunctional('card__title-actions')
const CardTitleText = createSimpleFunctional('card__title-text')

export {
  Card,
  CardActions,
  CardMenu,
  CardStack,
  CardText,
  CardTitle,
  CardTitleActions,
  CardTitleText
}