const Divider = {
  functional: true,

  render (createElement, context) {
    let params = {
      'class': 'divider'
    }

    if (context.data.attrs && context.data.attrs.inset) {
      params.class += ' divider--inset'
    }

    return createElement('hr', params)
  }
}

export default {
  Divider
}