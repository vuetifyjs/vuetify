module.exports = {
  'v-badge': {
    props: [
      {
        name: 'bottom',
        default: 'false',
        type: 'Boolean',
      },
      {
        name: 'color',
        default: 'primary',
        type: 'String',
      },
      {
        name: 'left',
        default: 'false',
        type: 'Boolean',
      },
      {
        name: 'mode',
        default: 'undefined',
        type: 'String',
      },
      {
        name: 'origin',
        default: 'undefined',
        type: 'String',
      },
      {
        name: 'overlap',
        default: 'false',
        type: 'Boolean',
      },
      {
        name: 'transition',
        default: 'fab-transition',
        type: 'String',
      },
      {
        name: 'value',
        default: 'true',
        type: 'Any', // @TODO Ask ?
      },
    ],
    slots: ['badge', 'default'],
  },
}
