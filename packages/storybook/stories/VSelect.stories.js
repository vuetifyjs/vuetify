export default { title: 'VSelect' }

export const asDefault = () => ({
  data: () => ({
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
  }),
  template: '<v-select :items="items" label="Select"></v-select>',
})
