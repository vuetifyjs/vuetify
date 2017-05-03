export default {
  functional: true,

  props: {
    fa: Boolean,
    light: Boolean,
    large: Boolean,
    left: Boolean,
    medium: Boolean,
    right: Boolean,
    xLarge: Boolean
  },

  render (h, { props, data, children }) {
    const icon = props.fa ? 'fa' : 'material-icons'
    data.staticClass = data.staticClass ? `${icon} icon ${data.staticClass} ` : `${icon} icon `

    const classes = {
      'icon--dark': !props.light,
      'icon--large': props.large,
      'icon--left': props.left,
      'icon--light': props.light,
      'icon--medium': props.medium,
      'icon--right': props.right,
      'icon--x-large': props.xLarge
    }

    data.staticClass += Object.keys(classes).filter(k => classes[k]).join(' ')

    if (props.fa) data.staticClass += ` ${children.pop().text}`

    return h('i', data, children)
  }
}
