module.exports = {
  'v-item-group': {
    slots: [
      {
        name: 'default',
        props: {
          isSelected: '(item: any) => boolean',
          select: '(item: any, selected: boolean) => void',
          next: '() => void',
          prev: '() => void',
          step: '(steps: number) => void',
          selected: 'string[]',
        },
      },
    ],
    events: [
      {
        name: 'update:modelValue',
        value: 'any[] | any',
      },
    ],
  },
}
