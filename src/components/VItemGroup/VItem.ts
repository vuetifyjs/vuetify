import Groupable from '../../mixins/groupable'

export default Groupable.extend({
  name: 'v-item',

  render () {
    if (!this.$scopedSlots.default) return null

    return this.$scopedSlots.default({
      active: this.isActive
    })
  }
})
