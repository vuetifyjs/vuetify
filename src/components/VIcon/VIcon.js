require('../../stylus/components/_icons.styl')

import { genColorClasses } from '../../util/helpers'

export default {
  name: 'v-icon',

  functional: true,

  props: {
    color: String,
    dark: Boolean,
    disabled: Boolean,
    large: Boolean,
    left: Boolean,
    light: Boolean,
    medium: Boolean,
    right: Boolean,
    textColor: String,
    xLarge: Boolean
  },

  render (h, { props, data, children = [] }) {
    data.attrs = data.attrs || {}

    let iconName = ''
    let iconType = 'material-icons'

    if (children.length) {
      iconName = children.pop().text
    } else if (data.domProps && data.domProps.textContent) {
      iconName = data.domProps.textContent
      delete data.domProps.textContent
    } else if (data.domProps && data.domProps.innerHTML) {
      iconName = data.domProps.innerHTML
      delete data.domProps.innerHTML
    }

    const thirdPartyIcon = iconName.indexOf('-') > -1
    if (thirdPartyIcon) iconType = iconName.slice(0, iconName.indexOf('-'))
    data.staticClass = (`${iconType} icon ${data.staticClass || ''}`).trim()

    const classes = Object.assign({
      'icon--disabled': props.disabled,
      'icon--large': props.large,
      'icon--left': props.left,
      'icon--medium': props.medium,
      'icon--right': props.right,
      'icon--x-large': props.xLarge,
      'theme--dark': props.dark,
      'theme--light': props.light
    })

    if (props.textColor) {
      classes[`${genColorClasses(props.textColor, props.dark)}--text`] = true
    }

    if (props.color) {
      classes[`${genColorClasses(props.color, props.dark)}`] = true
    }

    const iconClasses = Object.keys(classes).filter(k => classes[k]).join(' ')
    iconClasses && (data.staticClass += ` ${iconClasses}`)

    if (thirdPartyIcon) data.staticClass += ` ${iconName}`
    else children.push(iconName)

    return h('i', data, children)
  }
}
