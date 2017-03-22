const Divider = {
  functional: true,

  render (h, context) {
    context.data.class = context.data.class || []
    context.data.class.push('divider')

    if (context.data.attrs) {
      'inset' in context.data.attrs && context.data.class.push('divider--inset')
      'light' in context.data.attrs && context.data.class.push('divider--light')
    }

    return h('hr', context.data)
  }
}

export default {
  Divider
}
