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
  },
}
