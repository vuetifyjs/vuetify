module.exports = {
  'v-window': {
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
    props: [
      {
        name: 'touch',
        example: {
          left: 'Function',
          right: 'Function',
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
