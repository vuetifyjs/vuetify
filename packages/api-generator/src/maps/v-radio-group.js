const { VInput } = require('../helpers/variables')

const ClickIndex = VInput.events.findIndex(e => e.name === 'click')
VInput.events.splice(ClickIndex, 1, {
  name: 'change',
  value: 'any',
})

module.exports = {
  'v-radio-group': VInput,
}
