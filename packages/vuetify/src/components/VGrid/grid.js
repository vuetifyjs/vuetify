export default function Grid (name) {
  /* @vue/component */
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
        const classes = Object.keys(data.attrs).filter(key => {
          // TODO: Remove once resolved
          // https://github.com/vuejs/vue/issues/7841
          if (key === 'slot') return false

          const value = data.attrs[key]
          return value || typeof value === 'string'
        })

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
