import Card from './Card'
import {
  createSimpleFunctional
} from '../../util/helpers'

const CardText = createSimpleFunctional('card__text')
const CardTitle = createSimpleFunctional('card__title')
const CardActions = createSimpleFunctional('card__actions')

export default {
  Card,
  CardActions,
  CardText,
  CardTitle
}
