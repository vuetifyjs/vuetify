import Store from './base.js'

function mergeStore (component, obj) {
  if (!obj.state) {
    Store.state[component] = {} // If state is not defined, pre-load it
  } else {
    Store.state = Object.assign(Store.state, obj.state)
  }

  Store.mutations = Object.assign(Store.mutations, obj.mutations)
}

function getComponentStores (array) {
  array.forEach(i => mergeStore(i, require(`../components/${i}/store`).default))

  return Store
}

export default getComponentStores([
  'collapsible',
  'carousel',
  'tabs'
])
