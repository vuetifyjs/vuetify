module.exports = {
  'v-slide-group': {
    events: [
      {
        name: 'change',
        value: 'any[] | any',
      },
      {
        name: 'click:prev',
        value: 'void',
      },
      {
        name: 'click:next',
        value: 'void',
      },
    ],
    slots: [
      {
        name: 'default',
        props: undefined,
      },
      {
        name: 'next',
        value: undefined,
      },
      {
        name: 'prev',
        value: undefined,
      },
    ],
  },
}
