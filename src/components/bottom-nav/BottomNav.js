  export default {
    functional: true,

    props: {
      absolute: Boolean,
      shift: Boolean,
      value: { required: false }
    },

    render (h, { data, props, children }) {
      data.staticClass = data.staticClass ? `bottom-nav ${data.staticClass}` : 'bottom-nav'

      if (props.absolute) data.staticClass += ' bottom-nav--absolute'
      if (props.shift) data.staticClass += ' bottom-nav--shift'
      if (props.value) data.staticClass += ' bottom-nav--active'

      return h('div', data, children)
    }
  }
