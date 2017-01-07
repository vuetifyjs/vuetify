import Itemable from '../../mixins/itemable'
import { closestParentTag } from '../../util/helpers'

export default {
  name: 'sidebar-item',

  mixins: [Itemable],

  props: {
    ripple: Boolean
  },

  computed: {
    groupUid () {
      let group = closestParentTag.call(this, 'v-sidebar-group')

      return group ? group._uid : null
    },

    sidebarId () {
      let sidebar = closestParentTag.call(this, 'v-sidebar')

      return sidebar ? sidebar.id : null
    }
  },

  methods: {
    click () {
      this.$vuetify.bus.pub(`sidebar-group:close:${this.sidebarId}`, this.groupUid)
      this.$vuetify.bus.pub(`sidebar:item-clicked:${this.sidebarId}`)
    }
  }
}