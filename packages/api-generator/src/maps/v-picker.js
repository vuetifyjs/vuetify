const VPickerProps = [
  { name: 'color', source: 'colorable' },
  { name: 'dark', source: 'themeable' },
  { name: 'light', source: 'themeable' },
  { name: 'fullWidth', source: 'v-picker' },
  { name: 'landscape', source: 'v-picker' },
  { name: 'headerColor', source: 'v-picker' },
  { name: 'noTitle', source: 'v-picker' },
  { name: 'width', source: 'v-picker' },
]

module.exports = {
  'v-picker': {
    props: VPickerProps,
  },
  VPickerProps,
}
