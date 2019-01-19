import { BaseItemGroup } from '../VItemGroup/VItemGroup'

export default BaseItemGroup.extend({
  name: 'VSlideGroup',

  provide (): object {
    return {
      slideGroup: this
    }
  }
})
