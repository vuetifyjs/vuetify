import { createSimpleFunctional } from '../../util/helpers'

const Col = {
  functional: true,

  render: (h, { data, children }) => {
    data.staticClass = data.staticClass ? `col ${data.staticClass}` : 'col'
    data.staticClass += ` ${Object.keys(data.attrs).join(' ')}`
    delete data.attrs

    return h('div', data, children)
  }
}

const Layout = {
  functional: true,

  render: (h, { data, children }) => {
    data.staticClass = data.staticClass ? `layout ${data.staticClass}` : 'layout'
    if (data.attrs) {
      data.staticClass += ` ${Object.keys(data.attrs).join(' ')}`
      delete data.attrs
    }

    return h('div', data, children)
  }
}

const Container = {
  functional: true,

  props: {
    fluid: Boolean
  },

  render (h, { props, data, children }) {
    data.staticClass = data.staticClass ? `container ${data.staticClass}` : 'container'

    if (props.fluid) data.staticClass += ' container--fluid'

    return h('div', data, children)
  }
}

const Main = {
  functional: true,

  props: {
    row: Boolean
  },

  render (h, { props, data, children }) {
    if (props.row) {
      data.staticClass = data.staticClass ? `row ${data.staticClass}` : 'row'
    }

    return h('main', data, children)
  }
}

const ColSpacer = createSimpleFunctional('col--spacer')
const Spacer = createSimpleFunctional('spacer')

const Content = {
  name: 'content',

  mounted () {
    this.$vuetify.load(() => {
      this.hasStorage = typeof sessionStorage !== 'undefined'
      this.init()
      this.$el.addEventListener('scroll', this.onScroll, { passive: true })
    })
  },

  beforeDestroy () {
    this.$el.removeEventListener('scroll', this.onScroll, { passive: true })
  },

  methods: {
    init () {
      if (this.hasStorage) {
        this.$el.scrollTop = sessionStorage.scrollTop || 0
      }
    },
    onScroll () {
      if (this.hasStorage) {
        sessionStorage.scrollTop = this.$el.scrollTop
      }
    }
  },

  render (h) {
    return h('div', {
      'class': 'content'
    }, this.$slots.default)
  }
}

export default {
  Col,
  ColSpacer,
  Container,
  Content,
  Spacer,
  Layout,
  Main
}
