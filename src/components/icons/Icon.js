export default {
  functional: true,

  props: {
    light: Boolean,
    large: Boolean,
    left: Boolean,
    medium: Boolean,
    right: Boolean,
    xLarge: Boolean
  },

  render (h, { props, data, children }) {
    data.staticClass = data.staticClass ? `material-icons icon ${data.staticClass} ` : 'material-icons icon '

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

    return h('i', data, children)
  }
}
