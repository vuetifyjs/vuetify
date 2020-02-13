export default { title: 'VCombobox' }

export const asDefault = () => ({
  data: () => ({
    value: null,
    items: [
      'Programming',
      'Design',
      'Vue',
      'Vuetify',
    ],
  }),
  template: '<v-combobox :items="items" v-model="value"></v-combobox>'
})
