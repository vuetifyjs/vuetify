import api from '@vuetify/api-generator'
import deprecatedIn from '@/data/deprecatedIn'
import newIn from '@/data/newIn'
import removed from '@/data/removed'

export default {
  namespaced: true,

  state: {
    api,
    deprecatedIn,
    newIn,
    removed
  }
}
