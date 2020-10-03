// Styles
import './VListItemGroup.sass'

// Extensions
import { BaseItemGroup } from '../VItemGroup/VItemGroup'

// Mixins
import Colorable from '../../mixins/colorable'

// Utilities
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'v-list-item-group',

  mixins: [
    BaseItemGroup,
    Colorable,
  ],

  provide () {
    return {
      isInGroup: true,
      listItemGroup: this,
    }
  },

  computed: {
    classes (): object {
      return {
        ...BaseItemGroup.computed!.classes.call(this),
        'v-list-item-group': true,
      }
    },
  },

  methods: {
    genData (): object {
      return this.setTextColor(this.color, {
        ...BaseItemGroup.methods!.genData.call(this),
        role: 'listbox',
      })
    },
  },
})
