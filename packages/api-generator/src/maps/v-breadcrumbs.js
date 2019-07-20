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
      {
        name: 'divider',
        props: undefined,
      },
      {
        name: 'item',
        props: {
          item: 'any[]',
        },
      },
    ],
  },
}
