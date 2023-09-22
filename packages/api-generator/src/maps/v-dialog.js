module.exports = {
  'v-dialog': {
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
    events: [
      {
        name: 'click:outside',
        value: 'MouseEvent',
      },
      {
        name: 'input',
        value: 'Boolean',
      },
      {
        name: 'keydown',
        value: 'KeyboardEvent',
      },
    ],
    exclude: {
      props: ['open-on-hover'],
    },
  },
}
