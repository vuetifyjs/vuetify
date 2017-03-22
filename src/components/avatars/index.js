const Avatar = {
  functional: true,

  render (h, context) {
    context.data.class = context.data.class || []
    context.data.class.push('avatar')

    return h('div', context.data, context.children)
  }
}

export default {
  Avatar
}
