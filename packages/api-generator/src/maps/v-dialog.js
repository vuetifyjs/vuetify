module.exports = {
  'v-dialog': {
    slots: [
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
