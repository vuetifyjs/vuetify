module.exports = {
  'v-breadcrumbs': {
    slots: ['default', 'divider'],
    scopedSlots: [
      {
        name: 'item',
        props: {
          item: 'any[]',
        },
      },
    ],
  },
}
