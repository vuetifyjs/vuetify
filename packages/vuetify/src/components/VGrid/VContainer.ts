import './_grid.sass'

import Grid from './grid'

import mergeData from '../../util/mergeData'

/* @vue/component */
export default Grid('container').extend({
  name: 'v-container',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    fluid: {
      type: Boolean,
      default: false,
    },
  },
  render (h, { props, data, children }) {
    let classes
    const { attrs } = data
    if (attrs) {
      // reset attrs to extract utility clases like pa-3
      data.attrs = {}
      classes = Object.keys(attrs).filter(key => {
        // TODO: Remove once resolved
        // https://github.com/vuejs/vue/issues/7841
        if (key === 'slot') return false

        const value = attrs[key]

        // add back data attributes like data-test="foo" but do not
        // add them as classes
        if (key.startsWith('data-')) {
          data.attrs![key] = value
          return false
        }

        return value || typeof value === 'string'
      })
    }

    return h(
      props.tag,
      mergeData(data, {
        class: Array<any>({
          container: !props.fluid,
          'container-fluid': props.fluid,
        }).concat(classes || []),
      }),
      children
    )
  },
})
