import Store from './base.js'

function mergeStore (component) {
  let obj = {}

  try {
    obj = require(`../components/${component}/store`).default
  } catch (e) {}

  if (!obj.state) {
    Store.state[component] = {} // If state is not defined, pre-load it
  } else {
    Store.state = Object.assign(Store.state, obj.state)
  }

  Store.mutations = Object.assign(Store.mutations, obj.mutations)
}

function getComponentStores (array) {
  array.forEach(i => mergeStore(i))

  return Store
}

// This is every component that must be bound to the store
export default getComponentStores([
  'collapsible',
  'carousel',
  'menu',
  'modal',
  'navbar',
  'progress-circular',
  'sidebar',
  'tabs'
])
