require('../../stylus/components/_icons.styl')

import Themeable from '../../mixins/themeable'
import Colorable from '../../mixins/colorable'

const SIZE_MAP = {
  small: '16px',
  default: '24px',
  medium: '28px',
  large: '36px',
  xLarge: '40px'
}

export default {
  name: 'v-icon',

  functional: true,

  mixins: [Colorable, Themeable],

  props: {
    disabled: Boolean,
    large: Boolean,
    left: Boolean,
    medium: Boolean,
    right: Boolean,
    size: {
      type: [Number, String],
      default: SIZE_MAP.default
    },
    small: Boolean,
    xLarge: Boolean
  },

  render (h, { props, data, children = [] }) {
    let fontSize = props.size
    switch (true) {
      case props.small: fontSize = SIZE_MAP.small
        break
      case props.medium: fontSize = SIZE_MAP.medium
        break
      case props.large: fontSize = SIZE_MAP.large
        break
      case props.xLarge: fontSize = SIZE_MAP.xLarge
        break
    }
    data.style = { fontSize, ...data.style }

    let iconName = ''
    if (children.length) {
      iconName = children.pop().text
    } else if (data.domProps && data.domProps.textContent) {
      iconName = data.domProps.textContent
      delete data.domProps.textContent
    } else if (data.domProps && data.domProps.innerHTML) {
      iconName = data.domProps.innerHTML
      delete data.domProps.innerHTML
    }

    let iconType = 'material-icons'
    const thirdPartyIcon = iconName.indexOf('-') > -1
    if (thirdPartyIcon) iconType = iconName.slice(0, iconName.indexOf('-'))

    data.staticClass = (`${iconType} icon ${data.staticClass || ''}`).trim()
    data.attrs = data.attrs || {}

    if (!('aria-hidden' in data.attrs)) {
      data.attrs['aria-hidden'] = true
    }

    const classes = Object.assign({
      'icon--disabled': props.disabled,
      'icon--left': props.left,
      'icon--right': props.right,
      'theme--dark': props.dark,
      'theme--light': props.light
    }, props.color ? Colorable.methods.addTextColorClassChecks.call(props, {}, 'color') : {
      'primary--text': props.primary,
      'secondary--text': props.secondary,
      'success--text': props.success,
      'info--text': props.info,
      'warning--text': props.warning,
      'error--text': props.error
    })

    const iconClasses = Object.keys(classes).filter(k => classes[k]).join(' ')
    iconClasses && (data.staticClass += ` ${iconClasses}`)

    if (thirdPartyIcon) data.staticClass += ` ${iconName}`
    else children.push(iconName)

    return h('i', data, children)
  }
}
