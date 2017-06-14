import Card from './Card'
import {
  createSimpleFunctional
} from '../../util/helpers'

const CardActions = createSimpleFunctional('card__actions')
const CardText = createSimpleFunctional('card__text')

const CardMedia = {
  name: 'card-media',

  props: {
    height: {
      type: [Number, String],
      default: 'auto'
    }
  },

  render (h) {
    const data = {
      'class': 'card__media',
      style: {
        height: !isNaN(this.height) ? `${this.height}px` : this.height
      }
    }

    return h('div', data, this.$slots.default)
  }
}

const CardTitle = {
  functional: true,

  props: {
    primary: Boolean
  },

  render (h, { data, props, children }) {
    data.staticClass = (`card__title ${data.staticClass || ''}`).trim()

    if (props.primary) data.staticClass += ' card__title--primary'

    return h('div', data, children)
  }
}

export default {
  Card,
  CardActions,
  CardMedia,
  CardText,
  CardTitle
}
