import TimeTitle from './mixins/time-title'
import TimeBody from './mixins/time-body'
import CardActions from '../../mixins/card-actions'

export default {
  name: 'time-picker',

  mixins: [CardActions, TimeBody, TimeTitle],

  props: {
    dark: Boolean,
    landscape: Boolean
  },

  render (h) {
    const children = []

    children.push(this.genTitle())
    children.push(this.genBody())
    children.push(this.genActions())

    return h('v-card', {
      'class': {
        'time-picker': true,
        'time-picker--dark': this.dark,
        'time-picker--landscape': this.landscape
      },
      props: {
        height: this.landscape ? '310px' : 'auto'
      }
    }, children)
  }
}
