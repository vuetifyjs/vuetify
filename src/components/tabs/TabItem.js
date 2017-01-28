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
        ['tabs', `${this.tabsUid}.active.target`, this.activate]
      ]
    },

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
    },

    click (e) {
      e.preventDefault()
      e.stopPropagation()

      this.event()
    },

    event () {
      this.$vuetify().event('tabs tab click', {
        id: this.tabsUid,
        component: 'tabs',
        item: this.target,
        location: {
          width: this.$el.clientWidth,
          offset: this.$el.offsetLeft
        }
      })
    }
  }
}
