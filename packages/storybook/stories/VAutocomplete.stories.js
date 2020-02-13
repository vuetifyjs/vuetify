export default { title: 'VAutocomplete' }

export const asDefault = () => ({
  data: () => ({
    items: ['foo', 'bar', 'fizz', 'buzz'],
    value: null,
  }),
  template: '<v-autocomplete v-model="value" :items="items" label="Autocomplete"></v-autocomplete>',
})
