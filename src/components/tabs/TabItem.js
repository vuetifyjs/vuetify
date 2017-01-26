import Eventable from '../../mixins/eventable'
import Itemable from '../../mixins/itemable'
import { closestParentTag } from '../../util/helpers'

export default {
  name: 'tab-item',

  mixins: [Eventable, Itemable],

  props: {
    selected: Boolean
  },

  computed: {
    events () {
      return [
        [`tab:open:${this.tabsUid}`, this.activate],
        [`tab:resize:${this.tabsUid}`, this.resize]
      ]
    },

    target () {
      return this.item.href.replace('#', '')
    },

    tabsUid () {
      let tabs = closestParentTag.call(this, 'v-tabs')

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

      if (!this.active) return

      this.$vuetify().load(this.location)
    },

    click (e) {
      e.preventDefault()
      
      this.$vuetify.bus.pub(`tab:click:${this.tabsUid}`, this.target)
      this.location()
    },

    location () {
      this.$vuetify.bus.pub(`tab:location:${this.tabsUid}`, this.$el.clientWidth, this.$el.offsetLeft)
    },

    resize () {
      if (this.active) {
        this.location()
      }
    }
  }
}