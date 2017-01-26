import Store from './base.js'

function mergeStore (obj) {
  Store.state = Object.assign(Store.state, obj.state)
  Store.mutations = Object.assign(Store.mutations, obj.mutations)
}

function getComponentStores (array) {
  array.forEach(i => mergeStore(require(`../components/${i}/store`).default))

  return Store
}

export default getComponentStores([
  'sidebar',
  'collapsible'
])