export default {
  functional: true,

  props: {
    footer: Boolean,
    leftFixedSidebar: Boolean,
    leftSidebar: Boolean,
    id: {
      type: String,
      default: 'app'
    },
    rightFixedSidebar: Boolean,
    rightSidebar: Boolean,
    topFixedToolbar: Boolean,
    topToolbar: Boolean,
    sidebarUnderToolbar: Boolean
  },

  render (h, context) {
    return h('div', {
      'class': {
        'with': true,
        'left-fixed-sidebar': context.props.leftFixedSidebar,
        'left-sidebar': context.props.leftSidebar,
        'bottom-footer': context.props.footer,
        'right-fixed-sidebar': context.props.rightFixedSidebar,
        'right-sidebar': context.props.rightSidebar,
        'top-fixed-toolbar': context.props.topFixedToolbar,
        'top-toolbar': context.props.topToolbar,
        'sidebar-under-toolbar': context.props.sidebarUnderToolbar
      },
      domProps: {
        id: context.props.id,
        'data-app': true
      }
    }, [context.children])
  }
}
