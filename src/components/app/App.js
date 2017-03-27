export default {
  functional: true,

  props: {
    id: {
      type: String,
      default: 'app'
    },
    leftSidebar: Boolean,
    rightSidebar: Boolean,
    sidebarUnderToolbar: Boolean,
    toolbarInset: Boolean,
    sidebarTemporary: Boolean,
    sidebarBreakpoint: {
      type: String,
      default: 'lg'
    },
    sidebarPersistent: Boolean,
    sidebarMini: Boolean,
    column: {
      type: Boolean,
      default: true
    }
  },

  render (h, {props, children}) {
    return h('div', {
      'class': {
        'with': props.leftSidebar || props.rightSidebar,
        'left-sidebar': props.leftSidebar,
        'right-sidebar': props.rightSidebar,
        'sidebar-under-toolbar': props.sidebarUnderToolbar,
        'layout-column': props.column,
        'sidebar-temporary': props.sidebarTemporary,
        'sidebar-persistent': props.sidebarPersistent,
        [`sidebar-break-${props.sidebarBreakpoint}`]: !props.sidebarPersistent && props.sidebarBreakpoint,
        'sidebar-mini': props.sidebarMini,
        'toolbar-inset': props.toolbarInset
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
