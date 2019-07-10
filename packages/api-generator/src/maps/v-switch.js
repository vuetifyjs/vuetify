const { inputSlots } = require('../variables')

module.exports = {
  'v-switch': {
    slots: inputSlots.concat(['label']),
  },
}
