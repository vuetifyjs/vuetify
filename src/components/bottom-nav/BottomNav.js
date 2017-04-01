  export default {
    functional: true,

    props: {
      absolute: Boolean,
      hidden: Boolean,
      shift: Boolean
    },

    render (h, { data, props, children }) {
      data.staticClass = data.staticClass ? `bottom-nav ${data.staticClass}` : 'bottom-nav'

      if (props.absolute) data.staticClass += ' bottom-nav--absolute'
      if (props.shift) data.staticClass += ' bottom-nav--shift'
      if (props.hidden) data.staticClass += ' bottom-nav--hidden'

      return h('div', data, children)
    }
  }
