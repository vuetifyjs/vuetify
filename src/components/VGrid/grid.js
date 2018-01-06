export default function Grid (name) {
  return {
    name: `v-${name}`,

    functional: true,

    props: {
      id: String,
      tag: {
        type: String,
        default: 'div'
      }
    },

    render: (h, { props, data, children }) => {
      data.staticClass = (`${name} ${data.staticClass || ''}`).trim()

      if (data.attrs) {
        const classes = []

        for (const key of Object.keys(data.attrs)) {
          const value = data.attrs[key]

          if ((typeof value === 'string') || value) classes.push(key)
        }

        if (classes.length) data.staticClass += ` ${classes.join(' ')}`
        delete data.attrs
      }

      if (props.id) {
        data.domProps = data.domProps || {}
        data.domProps.id = props.id
      }

      return h(props.tag, data, children)
    }
  }
}
