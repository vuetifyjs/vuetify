const { VSelect } = require('../variables')

VSelect.props.push({
  name: 'menuProps',
  default: '{"closeOnClick":false, "closeOnContentClick":false, "openOnClick":false, "maxHeight":300, "offsetY":true, "offsetOverflow":true, "transition":false}',
})

module.exports = {
  'v-overflow-btn': VSelect,
}
