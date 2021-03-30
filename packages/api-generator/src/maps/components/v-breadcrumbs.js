const BreadcrumbsItem = [{
  disabled: 'boolean',
  exact: 'boolean',
  href: 'string',
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
        name: 'default',
        props: undefined,
      },
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
