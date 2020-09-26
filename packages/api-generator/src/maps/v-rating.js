module.exports = {
  'v-rating': {
    events: [
      {
        name: 'input',
        value: 'Number',
      },
    ],
    slots: [
      {
        name: 'default',
        props: undefined,
      },
      {
        name: 'item',
        props: {
          click: '(i: number) => void',
          index: 'number',
          isFilled: 'boolean',
          isHalfFilled: '?boolean',
          isHalfHovered: '?boolean',
          isHovered: 'boolean',
          value: 'number',
        },
      },
    ],
  },
}
