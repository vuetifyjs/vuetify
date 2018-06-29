import translationClient from '../../../util/translationClient'

export default {
  async save ({ commit }, payload) {
    return translationClient.save(payload)
  },
  async status ({ commit }, payload) {
    return translationClient.getStatus(payload)
  },
  async new ({ commit }, payload) {
    return translationClient.new(payload)
  }
}
