import Vue, { VNode, VNodeDirective } from 'vue'
import { VIcon } from '../VIcon'

import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import { wrapInArray } from '../../util/helpers'

export default Vue.extend({
  name: 'v-simple-checkbox',

  functional: true,

  props: {
    ...Colorable.options.props,
    ...Themeable.options.props,
    ripple: {
      type: Boolean,
      default: true
    },
    value: Boolean,
    indeterminate: Boolean,
    indeterminateIcon: {
      type: String,
      default: '$vuetify.icons.checkboxIndeterminate'
    },
    onIcon: {
      type: String,
      default: '$vuetify.icons.checkboxOn'
    },
    offIcon: {
      type: String,
      default: '$vuetify.icons.checkboxOff'
    }
  },

  render (h, { props, data }): VNode {
    const children = []

    if (props.ripple) {
      const ripple = h('div', Colorable.options.methods.setTextColor(props.color, {
        staticClass: 'v-input--selection-controls__ripple',
        directives: [{
          name: 'ripple',
          value: { center: true }
        }] as VNodeDirective[]
      }))

      children.push(ripple)
    }

    let icon = props.offIcon
    if (props.indeterminate) icon = props.indeterminateIcon
    else if (props.value) icon = props.onIcon

    children.push(h(VIcon, Colorable.options.methods.setTextColor(props.color, {
      props: {
        dark: props.dark,
        light: props.light
      }
    }), icon))

    const staticClass = `v-simple-checkbox ${data.staticClass || ''}`.trim()

    return h('div', {
      ...data,
      staticClass,
      on: {
        click: () => {
          if (data.on && data.on.input) {
            wrapInArray(data.on.input).forEach(f => f(!props.value))
          }
        }
      }
    }, children)
  }
})
