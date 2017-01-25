var Store = {
  state: {
    common: {
      bodyClick: null
    }
  },
  
  mutations: {
    'vuetify/BODY_CLICK' (store, obj) {
      store.common.bodyClick = obj
    }
  }
}

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