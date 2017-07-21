import Themeable from '~mixins/themeable'
import Contextualable from '~mixins/contextualable'

export default {
  functional: true,

  mixins: [Themeable, Contextualable],

  props: {
    disabled: Boolean,
    fa: Boolean,
    mdi: Boolean,
    large: Boolean,
    left: Boolean,
    medium: Boolean,
    right: Boolean,
    xLarge: Boolean
  },

  render (h, { props, data, children }) {
    if (props.fa) console.warn('The v-icon prop \'fa\' will be deprecated in the next release. Use \'fa-\' prefix in icon name instead.')
    if (props.mdi) console.warn('The v-icon prop \'mdi\' will be deprecated in the next release. Use \'mdi-\' prefix in icon name instead.')

    const iconName = children.pop().text
    const thirdPartyIcon = iconName.indexOf('-') > -1
    let iconType = thirdPartyIcon ? iconName.slice(0, iconName.indexOf('-')) : 'material-icons'

    // To keep things backwards compatible for now
    iconType = props.fa ? 'fa' : props.mdi ? 'mdi' : iconType

    data.staticClass = (`${iconType} icon ${data.staticClass || ''}`).trim()
    data.attrs = data.attrs || {}

    if (props.dark) data.staticClass += ' theme--dark'
    if (props.light) data.staticClass += ' theme--light'

    const classes = {
      'icon--large': props.large,
      'icon--left': props.left,
      'icon--medium': props.medium,
      'icon--right': props.right,
      'icon--x-large': props.xLarge,
      'primary--text': props.primary,
      'secondary--text': props.secondary,
      'success--text': props.success,
      'info--text': props.info,
      'warning--text': props.warning,
      'error--text': props.error
    }

    const iconClasses = Object.keys(classes).filter(k => classes[k]).join(' ')
    iconClasses && (data.staticClass += ` ${iconClasses}`)

    // To keep things backwards compatible for now
    if (props.fa || props.mdi) {
      const comparison = props.fa ? 'fa' : 'mdi'

      if (iconName.indexOf(' ') > -1) data.staticClass += ` ${comparison}-${iconName}`
      else data.staticClass += ` ${comparison}-${iconName.split(' ').join('-')}`
    }

    if (thirdPartyIcon) {
      data.staticClass += ` ${iconName}`
    }

    !(thirdPartyIcon || props.fa || props.mdi) && children.push(iconName)

    if (props.disabled) data.attrs.disabled = props.disabled

    return h('i', data, children)
  }
}
