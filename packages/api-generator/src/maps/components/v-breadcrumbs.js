const BreadcrumbsItem = [{
  disabled: 'boolean',
  exact: 'boolean',
  href: 'string',
  link: 'boolean',
  title: 'string | number',
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
        name: 'prepend',
        props: undefined,
      },
      {
        name: 'title',
        props: {
          item: 'any[]',
        },
      },
    ],
  },
}
