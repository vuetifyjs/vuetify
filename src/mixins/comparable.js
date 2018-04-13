import {looseEqual} from "../util/helpers"

export default {
  props: {
    valueComparator: {
      type: Function,
      default: looseEqual
    }
  }
}
