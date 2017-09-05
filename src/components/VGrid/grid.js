export default function Grid (name) {
  return {
    name: `v-${name}`,

    functional: true,

    props: {
      id: String
    },

    render: (h, { props, data, children }) => {
      data.staticClass = (`${name} ${data.staticClass || ''}`).trim()

      if (data.attrs) {
        data.staticClass += ` ${Object.keys(data.attrs).join(' ')}`
        delete data.attrs
      }

      if (props.id) {
        data.domProps = data.domProps || {}
        data.domProps.id = props.id
      }

      return h('div', data, children)
    }
  }
}
