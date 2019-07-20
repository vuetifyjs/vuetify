module.exports = {
  'v-rating': {
    slots: [{
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
    }],
  },
}
