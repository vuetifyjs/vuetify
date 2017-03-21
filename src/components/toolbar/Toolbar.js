export default {
  functional: true,

  name: 'toolbar',

  props: {
    fixed: Boolean
  },

  render (h, context) {
    return h('nav', {
      'class': {
        'toolbar': true,
        'toolbar--fixed': context.props.fixed
      }
    }, [context.children])
  }
}
