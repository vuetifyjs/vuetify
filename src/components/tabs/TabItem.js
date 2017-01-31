import Itemable from '../../mixins/itemable'
import { closestParentTag } from '../../util/helpers'

export default {
  name: 'tab-item',

  mixins: [Itemable],

  props: {
    selected: Boolean
  },

  computed: {
    target () {
      return this.item.href.replace('#', '')
    },

    tabsUid () {
      const tabs = closestParentTag.call(this, 'v-tabs')

      return tabs ? tabs._uid : null
    }
  },

  mounted () {
    if (this.selected || window.location.hash.substr(1) === this.target) {
      this.$vuetify().load(this.click)
    }
  },

  methods: {
    activate (target) {
      this.active = target === this.target

      if (this.active) {
        this.$vuetify().load(this.location)
      }
    },

    click (e) {
      e.preventDefault()
      e.stopPropagation()

      this.location()
    },

    location () {
    },

    resize () {
      if (this.active) {
        this.location()
      }
    }
  }
}
