module.exports = {
  'v-bottom-sheet': {
    slots: [
      {
        name: 'default',
        props: undefined,
      },
      {
        name: 'activator',
        props: {
          attrs: '{ role: string, aria-haspopup: boolean, aria-expanded: string }',
          on: '{ [eventName]: eventHandler }',
          value: 'boolean',
        },
      },
    ],
    exclude: {
      props: ['open-on-hover'],
    },
  },
}
