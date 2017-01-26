export default {
  state: {
    collapsible: {}
  },

  mutations: {
    'vuetify/COLLAPSIBLE_TOGGLE' (store, obj) {
      let index = store.collapsible[obj.id].items.indexOf(obj.headerId)

      if (!store.collapsible[obj.id].expand) {
        if (index !== -1) {
          return store.collapsible[obj.id].items = []
        }
        
        return store.collapsible[obj.id].items = [obj.headerId]
      }

      if (index !== -1) {
        store.collapsible[obj.id].items.splice(index, 1)
      } else {
        store.collapsible[obj.id].items.push(obj.headerId)
      }
    }
  }
}