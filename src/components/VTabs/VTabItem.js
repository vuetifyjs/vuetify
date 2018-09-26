// Extensions
import { WindowItemInstance } from '../VWindow/VWindowItem'

// Mixins
import {
  factory as GroupableFactory
} from '../../mixins/groupable'

/* @vue/component */
export default {
  name: 'v-tab-item',

  mixins: [
    WindowItemInstance,
    GroupableFactory('windowGroup', 'v-tab-item', 'v-tabs-items')
  ]
}
