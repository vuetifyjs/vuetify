const { VSelect } = require('../helpers/variables')

const ItemObject = {
  text: 'string | number | object',
  value: 'string | number | object',
}

VSelect.props.push({
  name: 'items',
  example: ItemObject,
})

VSelect.events.push(
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
  'v-select': VSelect,
}
