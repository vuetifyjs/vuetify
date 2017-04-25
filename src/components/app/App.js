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
    sidebarUnderToolbar: Boolean,
    column: {
      type: Boolean,
      default: true
    }
  },

  render (h, {props, data, children}) {
    data.staticClass = data.staticClass ? `with ${data.staticClass} ` : 'with '

    const classes = {
      'left-fixed-sidebar': props.leftFixedSidebar,
      'left-sidebar': props.leftSidebar,
      'bottom-footer': props.footer,
      'right-fixed-sidebar': props.rightFixedSidebar,
      'right-sidebar': props.rightSidebar,
      'top-fixed-toolbar': props.topFixedToolbar,
      'top-toolbar': props.topToolbar,
      'sidebar-under-toolbar': props.sidebarUnderToolbar,
      'layout-column': props.column
    }

    data.staticClass += Object.keys(classes).filter(k => classes[k]).join(' ')

    data.attrs = {'data-app': true}
    data.domProps = {id: props.id}

    return h('div', data, children)

    //>>>>>>> dev
  }
}
