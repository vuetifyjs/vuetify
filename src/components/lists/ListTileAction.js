export default {
  functional: true,

  name: 'list-tile-action',

  render (h, context) {
    const data = {
      'class': {
        'list__tile__action': true,
        'list__tile__action--stack': context.children.length > 1
      }
    }

    return h('div', data, context.children)
  }
}
