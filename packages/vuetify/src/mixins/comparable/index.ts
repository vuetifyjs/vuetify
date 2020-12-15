import Vue from 'vue'
import { PropValidator } from 'vue/types/options'
import { deepEqual } from '../../util/helpers'

export default Vue.extend({
  name: 'comparable',
  props: {
    valueComparator: {
      type: Function,
      default: deepEqual,
    } as PropValidator<typeof deepEqual>,
  },
})
