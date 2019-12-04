import './VSimpleCheckbox.sass'

import ripple from '../../directives/ripple'

import Vue, { VNode, VNodeDirective } from 'vue'
import { VIcon } from '../VIcon'

import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import { wrapInArray } from '../../util/helpers'

export default Vue.extend({
  name: 'v-simple-checkbox',

  functional: true,

  directives: {
    ripple,
  },

  props: {
    ...Colorable.options.props,
    ...Themeable.options.props,
    disabled: Boolean,
    ripple: {
      type: Boolean,
      default: true,
    },
    value: Boolean,
    indeterminate: Boolean,
    indeterminateIcon: {
      type: String,
      default: '$checkboxIndeterminate',
    },
    onIcon: {
      type: String,
      default: '$checkboxOn',
    },
    offIcon: {
      type: String,
      default: '$checkboxOff',
    },
  },

  render (h, { props, data }): VNode {
    const children = []

    if (props.ripple && !props.disabled) {
      const ripple = h('div', Colorable.options.methods.setTextColor(props.color, {
        staticClass: 'v-input--selection-controls__ripple',
        directives: [{
          name: 'ripple',
          value: { center: true },
        }] as VNodeDirective[],
      }))

      children.push(ripple)
    }

    let icon = props.offIcon
    if (props.indeterminate) icon = props.indeterminateIcon
    else if (props.value) icon = props.onIcon

    children.push(h(VIcon, Colorable.options.methods.setTextColor(props.value && props.color, {
      props: {
        disabled: props.disabled,
        dark: props.dark,
        light: props.light,
      },
    }), icon))

    const classes = {
      'v-simple-checkbox': true,
      'v-simple-checkbox--disabled': props.disabled,
    }

    return h('div', {
      ...data,
      class: classes,
      on: {
        click: (e: MouseEvent) => {
          e.stopPropagation()

          if (data.on && data.on.input && !props.disabled) {
            wrapInArray(data.on.input).forEach(f => f(!props.value))
          }
        },
      },
    }, children)
  },
})
