module.exports = {
  'v-item': {
    slots: [
      {
        name: 'default',
        props: {
          selected: 'boolean',
          selectedClass: 'string',
          toggle: '() => void',
          select: '(selected: boolean) => void',
          value: 'any',
          disabled: 'boolean',
        },
      },
    ],
  },
}
