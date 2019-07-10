// Extensions
import VWindowItem from '../VWindow/VWindowItem'

/* @vue/component */
export default VWindowItem.extend({
  name: 'v-tab-item',

  props: {
    id: String,
  },

  methods: {
    genWindowItem () {
      const item = VWindowItem.options.methods.genWindowItem.call(this)

      item.data!.domProps = item.data!.domProps || {}
      item.data!.domProps.id = this.id || this.value

      return item
    },
  },
})
