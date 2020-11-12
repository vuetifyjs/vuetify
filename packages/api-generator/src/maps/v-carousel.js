module.exports = {
  'v-carousel': {
    slots: [
      {
        name: 'default',
        props: undefined,
      },
      {
        name: 'next',
        props: {
          attrs: '{ aria-label: string }',
          on: '{ click: eventHandler }',
        },
      },
      {
        name: 'prev',
        props: {
          attrs: '{ aria-label: string }',
          on: '{ click: eventHandler }',
        },
      },
    ],
    events: [
      {
        name: 'change',
        value: 'number',
      },
    ],
  },
}
