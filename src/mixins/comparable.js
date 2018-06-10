import { deepEqual } from '../util/helpers'

export default {
  name: 'comparable',
  props: {
    valueComparator: {
      type: Function,
      default: deepEqual
    }
  }
}
