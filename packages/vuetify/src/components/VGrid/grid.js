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

      const { attrs } = data
      if (attrs) {
        // reset attrs to extract utility clases like pa-3
        data.attrs = {}
        const classes = Object.keys(attrs).filter(key => {
          // TODO: Remove once resolved
          // https://github.com/vuejs/vue/issues/7841
          if (key === 'slot') return false

          const value = attrs[key]

          // add back data attributes like data-test="foo" but do not
          // add them as classes
          if (key.startsWith('data-')) {
            data.attrs[key] = value
            return false
          }

          return value || typeof value === 'string'
        })

        if (classes.length) data.staticClass += ` ${classes.join(' ')}`
      }

      if (props.id) {
        data.domProps = data.domProps || {}
        data.domProps.id = props.id
      }

      return h(props.tag, data, children)
    }
  }
}
