export default { title: 'VOverflowBtn' }

export const asDefault = () => ({
  data: () => ({
    items: ['Arial', 'Calibri', 'Courier', 'Verdana'],
  }),
  template: '<v-overflow-btn :items="items" label="Overflow Btn"></v-overflow-btn>'
})
