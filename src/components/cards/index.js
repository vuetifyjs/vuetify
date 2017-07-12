import {
  createSimpleFunctional
} from '~util/helpers'
import Card from './Card'
import CardMedia from './CardMedia'
import CardTitle from './CardTitle'

const CardActions = createSimpleFunctional('card__actions')
const CardText = createSimpleFunctional('card__text')

export default {
  Card,
  CardActions,
  CardMedia,
  CardText,
  CardTitle
}
