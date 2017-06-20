import Schemable from '../../mixins/schemable'

export default {
  functional: true,

  mixins: [Schemable],

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
    const icon = props.fa ? 'fa' : props.mdi ? 'mdi' : 'material-icons'
    data.staticClass = data.staticClass ? `${icon} icon ${data.staticClass} ` : `${icon} icon`
    data.attrs = data.attrs || {}

    if (props.dark) data.staticClass += ' dark--text'
    if (props.light) data.staticClass += ' light--text'

    const classes = {
      'icon--large': props.large,
      'icon--left': props.left,
      'icon--medium': props.medium,
      'icon--right': props.right,
      'icon--x-large': props.xLarge
    }

    const iconClasses = Object.keys(classes).filter(k => classes[k]).join(' ')
    iconClasses && (data.staticClass += ` ${iconClasses}`)

    if (props.fa || props.mdi) {
      const comparison = props.fa ? 'fa' : 'mdi'
      const text = children.pop().text

      if (text.indexOf(' ') === -1) data.staticClass += ` ${comparison}-${text}`
      else data.staticClass += ` ${comparison}-${text.split(' ').join('-')}`
    }

    if (props.disabled) {
      data.attrs.disabled = props.disabled
    }

    return h('i', data, children)
  }
}
