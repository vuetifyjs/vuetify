// Extensions
import { BaseItem } from '../VItemGroup/VItem'

// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'
import mixins from '../../util/mixins'

export default mixins(
  BaseItem,
  GroupableFactory('slideGroup')
  /* @vue/component */
).extend({
  name: 'v-slide-item',
})
