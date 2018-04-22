import { deepEqual } from '../util/helpers'

export default {
  props: {
    valueComparator: {
      type: Function,
      default: deepEqual
    }
  }
}
