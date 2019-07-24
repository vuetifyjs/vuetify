const { VSlider } = require('../helpers/variables')

VSlider.events.push(
  {
    name: 'blur',
    value: 'boolean',
  },
  {
    name: 'focus',
    value: 'boolean',
  },
)

module.exports = {
  'v-slider': VSlider,
}
