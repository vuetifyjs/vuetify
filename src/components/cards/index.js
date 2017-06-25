import Card from './Card'
import CardMedia from './CardMedia'
import CardTitle from './CardTitle'
import {
  createSimpleFunctional
} from '~util/helpers'

const CardActions = createSimpleFunctional('card__actions')
const CardText = createSimpleFunctional('card__text')

export default {
  Card,
  CardActions,
  CardMedia,
  CardText,
  CardTitle
}
