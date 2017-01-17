import { createSimpleFunctional } from '../../util/helpers'

import ListGroup from './ListGroup.vue'
import ListTile from './ListTile'

const ListRow = createSimpleFunctional('list__row', 'li')
const ListTileActionText = createSimpleFunctional('list__tile__action-text', 'span')
const ListTileAvatar = createSimpleFunctional('list__tile__avatar', 'div')
const ListTileContent = createSimpleFunctional('list__tile__content', 'div')
const ListTileTitle = createSimpleFunctional('list__tile__title', 'div')

const List = {
  name: 'list',

  props: {
    dense: Boolean,

    items: {
      type: Array,
      default: () => []
    },

    threeLine: Boolean,

    twoLine: Boolean
  },

  computed: {
    classes () {
      return {
        'list': true,
        'list--two-line': this.twoLine,
        'list--dense': this.dense,
        'list--three-line': this.threeLine
      }
    }
  },

  render (createElement) {
    let data = { 
      'class': this.classes,
      attrs: {
        'data-uid': this._uid
      }
    }

    // if (this.items) {
    //   let items = []

    //   this.items.forEach(obj => {
    //     items.push(
    //       createElement('div')
    //     )
    //   })
    // }

    return createElement('ul', data, this.$slots.default)
  }
}

const ListTileAction = {
  name: 'list-tile-action',

  data () {
    return {
      stack: false
    }
  },

  computed: {
    classes () {
      return {
        'list__tile__action': true,
        'list__tile__action--stack': this.stack
      }
    }
  },

  mounted () {
    this.stack = this.$el.childElementCount > 1
  },

  render (createElement) {
    let data = { 
      'class': this.classes
    }

    return createElement('div', data, this.$slots.default)
  }
}

const ListTileSubTitle = {
  functional: true,

  render (h, { data, children }) {
    let listClass = 'list__tile__sub-title'

    if (data.attrs && data.attrs.clamp) {
      listClass += ' list__tile__sub-title--clamp'
    }

    data.staticClass = data.staticClass ? `${listClass} ${data.staticClass}` : listClass

    return h('div', data, children)
  }
}

export default {
  List,
  ListRow,
  ListTile,
  ListGroup,
  ListTileAction,
  ListTileActionText,
  ListTileAvatar,
  ListTileContent,
  ListTileTitle,
  ListTileSubTitle
}