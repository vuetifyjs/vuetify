import Card from './Card'
import {
  createSimpleFunctional
} from '~util/helpers'

const CardActions = createSimpleFunctional('card__actions')
const CardText = createSimpleFunctional('card__text')

const CardMedia = {
  name: 'card-media',

  props: {
    height: {
      type: [Number, String],
      default: 'auto'
    },
    src: {
      type: String
    }
  },

  render (h) {
    const data = {
      'class': 'card__media',
      style: {
        height: !isNaN(this.height) ? `${this.height}px` : this.height
      }
    }

    const children = []

    if (this.src) {
      children.push(h('div', {
        'class': 'card__media__background',
        style: {
          background: `url(${this.src}) center center`
        }
      }))
    }

    children.push(h('div', {
      'class': 'card__media__content'
    }, this.$slots.default))

    return h('div', data, children)
  }
}

const CardTitle = {
  functional: true,

  props: {
    primaryTitle: Boolean
  },

  render (h, { data, props, children }) {
    data.staticClass = (`card__title ${data.staticClass || ''}`).trim()

    if (props.primaryTitle) data.staticClass += ' card__title--primary'

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
