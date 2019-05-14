module.exports = {
  'v-breadcrumbs': {
    slots: ['divider'],
    scopedSlots: [
      {
        name: 'item',
        props: {
          item: 'any[]'
        }
      }
    ]
  }
}
