// Styles
import './VListItemGroup.sass'

// Extensions
import { BaseItemGroup } from '../VItemGroup/VItemGroup'

// Mixins
import Colorable from '../../mixins/colorable'

// Utilities
import mixins from '../../util/mixins'

export default mixins(
  BaseItemGroup,
  Colorable
).extend({
  name: 'v-list-item-group',

  provide () {
    return {
      isInGroup: true,
      listItemGroup: this,
    }
  },

  computed: {
    classes (): object {
      return {
        ...BaseItemGroup.options.computed.classes.call(this),
        'v-list-item-group': true,
      }
    },
  },

  methods: {
    genData (): object {
      return this.setTextColor(this.color, {
        ...BaseItemGroup.options.methods.genData.call(this),
        attrs: {
          role: 'listbox',
        },
      })
    },
  },
})
