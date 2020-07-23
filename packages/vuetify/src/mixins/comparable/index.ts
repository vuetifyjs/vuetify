import Vue, { PropType } from 'vue'
import { deepEqual } from '../../util/helpers'

export default Vue.extend({
  name: 'comparable',
  props: {
    valueComparator: {
      type: Function as PropType<typeof deepEqual>,
      default: deepEqual,
    },
  },
})
