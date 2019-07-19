const { VSelect } = require('../helpers/variables')

const ItemObject = {
  text: 'string | number | object',
  value: 'string | number | object',
}

VSelect.props.push({
  name: 'items',
  example: ItemObject,
})

module.exports = {
  'v-select': VSelect,
}
