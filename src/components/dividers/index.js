const Divider = {
  functional: true,

  render (createElement, { data }) {
    const params = {
      'class': 'divider'
    }

    if (data.attrs) {
      if ('inset' in data.attrs) {
        params.class += ' divider--inset'
      }

      if ('light' in data.attrs) {
        params.class += ' divider--light'
      }
    }

    return createElement('hr', params)
  }
}

export default {
  Divider
}
