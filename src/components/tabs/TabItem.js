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
        ['tabs', `${this.tabsUid}.active.target`, this.activate],
        ['tabs', `${this.tabsUid}.resize`, this.resize]
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

      if (this.active) {
        this.$vuetify().load(this.location)
      }
    },

    click (e) {
      e.preventDefault()
      e.stopPropagation()

      this.$vuetify().event('tabs.tab.click', {
        id: this.tabsUid,
        component: 'tabs',
        click: this.target
      })

      this.location()
    },

    location () {
      this.$vuetify().event('tabs.tab.location', {
        id: this.tabsUid,
        component: 'tabs',
        location: {
          width: this.$el.clientWidth,
          offset: this.$el.offsetLeft
        }
      })
    },

    resize () {
      if (this.active) {
        this.location()
      }
    }
  }
}
