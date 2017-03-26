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

  render (h, { props, children }) {
    return h('div', {
      'class': {
        'with': true,
        'left-fixed-sidebar': props.leftFixedSidebar,
        'left-sidebar': props.leftSidebar,
        'bottom-footer': props.footer,
        'right-fixed-sidebar': props.rightFixedSidebar,
        'right-sidebar': props.rightSidebar,
        'top-fixed-toolbar': props.topFixedToolbar,
        'top-toolbar': props.topToolbar,
        'sidebar-under-toolbar': props.sidebarUnderToolbar
      },
      attrs: {
        'data-app': true
      },
      domProps: {
        id: props.id
      }
    }, children)
  }
}
