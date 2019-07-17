const BreadcrumbsItem = [{
  href: 'string',
  disabled: 'boolean',
  link: 'boolean',
  text: 'string | number',
  to: 'string | object',
}]

module.exports = {
  'v-breadcrumbs': {
    props: [{
      name: 'items',
      example: BreadcrumbsItem,
    }],
    slots: [
      'default',
      'divider',
      {
        name: 'item',
        props: {
          item: 'any[]',
        },
      },
    ],
  },
}
