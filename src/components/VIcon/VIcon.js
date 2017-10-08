require('../../stylus/components/_icons.styl')

import Themeable from '../../mixins/themeable'
import Colorable from '../../mixins/colorable'
import Contextualable from '../../mixins/contextualable'

export default {
  name: 'v-icon',

  functional: true,

  mixins: [Colorable, Contextualable, Themeable],

  props: {
    disabled: Boolean,
    large: Boolean,
    left: Boolean,
    medium: Boolean,
    right: Boolean,
    xLarge: Boolean
  },

  render (h, { props, data, children = [] }) {
    Object.keys(Contextualable.props).forEach(prop => {
      if (props[prop]) {
        console.warn(`Context prop '${prop}' for VIcon component has been deprecated. Use 'color' prop instead.`)
      }
    })

    if (props.fa || props.mdi) console.warn(`The v-icon prop 'fa' and 'mdi' will be deprecated in the next release. Use 'fa' or 'mdi' prefix in icon name instead.`)
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

    // To keep things backwards compatible for now
    iconType = props.fa ? 'fa' : props.mdi ? 'mdi' : iconType

    data.staticClass = (`${iconType} icon ${data.staticClass || ''}`).trim()
    data.attrs = data.attrs || {}

    const classes = Object.assign({
      'icon--disabled': props.disabled,
      'icon--large': props.large,
      'icon--left': props.left,
      'icon--medium': props.medium,
      'icon--right': props.right,
      'icon--x-large': props.xLarge,
      'theme--dark': props.dark,
      'theme--light': props.light
    }, props.color ? Colorable.methods.addTextColorClassChecks.call(props, {}) : {
      'primary--text': props.primary,
      'secondary--text': props.secondary,
      'success--text': props.success,
      'info--text': props.info,
      'warning--text': props.warning,
      'error--text': props.error
    })

    const iconClasses = Object.keys(classes).filter(k => classes[k]).join(' ')
    iconClasses && (data.staticClass += ` ${iconClasses}`)

    // To keep things backwards compatible for now
    if (props.fa || props.mdi) {
      const comparison = props.fa ? 'fa' : 'mdi'

      if (iconName.indexOf(' ') > -1) data.staticClass += ` ${comparison}-${iconName}`
      else data.staticClass += ` ${comparison}-${iconName.split(' ').join('-')}`
    }

    if (thirdPartyIcon) data.staticClass += ` ${iconName}`
    !(thirdPartyIcon || props.fa || props.mdi) && children.push(iconName)

    return h('i', data, children)
  }
}
