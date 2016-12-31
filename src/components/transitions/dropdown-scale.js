let DropdownScale = {
  functional: true,
  render (createElement, context) {
    let data = {
      props: {
        name: 'dropdown-scale'
      }
    }

    return createElement('transition', data, context.children)
  }
}

export default {
  DropdownScale
}