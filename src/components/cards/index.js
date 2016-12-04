import Card from './Card.vue'
import CardRow from './CardRow.vue'
import { 
  createSimpleFunctional
} from '../../util/helpers'

const CardColumn = createSimpleFunctional('card__column')
const CardText = createSimpleFunctional('card__text')
const CardTitle = createSimpleFunctional('card__title')

export default {
  Card,
  CardRow,
  CardColumn,
  CardText,
  CardTitle
}