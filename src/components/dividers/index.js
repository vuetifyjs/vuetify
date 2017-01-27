const Divider = {
  functional: true,

  render (createElement, { data }) {
    const params = {
      'class': 'divider'
    }

    if (data.attrs) {
      if (data.attrs.inset) {
        params.class += ' divider--inset'
      }

      if (data.attrs.light) {
        params.class += ' divider--light'
      }
    }

    return createElement('hr', params)
  }
}

export default {
  Divider
}
