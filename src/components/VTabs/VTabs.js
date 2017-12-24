require('../../stylus/components/_tabs.styl')

import Resize from '../../directives/resize'

import {
  provide as RegistrableProvide
} from '../../mixins/registrable'
import SSRBootable from '../../mixins/ssr-bootable'

export default {
  name: 'v-tabs',

  directives: {
    Resize
  },

  mixins: [
    RegistrableProvide('tabs'),
    SSRBootable
  ],

  provide () {
    return {
      next: this.next,
      prev: this.prev,
      tabClick: this.tabClick
    }
  },

  data: () => ({
    activeIndex: null,
    content: [],
    bar: [],
    isBooted: false,
    reverse: false,
    tabItems: []
  }),

  props: {
    value: String
  },

  computed: {
    activeTab () {
      if (!this.tabItems.length) return undefined

      return this.tabItems[this.activeIndex]
    },
    target () {
      return this.activeTab
        ? this.activeTab.id
        : null
    }
  },

  watch: {
    activeIndex (current, previous) {
      this.reverse = current < previous
      this.updateTabs()
    },
    activeTab (val) {
      this.$emit('input', (val && val.id || val))
    },
    bar (val) {
      if (!val || !this.activeTab) return

      // Welcome to suggestions for solving
      // initial load positioning
      this.updateTabs()
    },
    tabItems (newItems, oldItems) {
      if (!newItems.length) return (this.activeIndex = null)
      if (!oldItems.length) return this.findActiveLink()

      const newIndex = newItems.findIndex(o => o.id === this.target)

      if (newIndex > -1) return this.activeIndex = newIndex

      this.activeIndex = newItems.length - 1
    },
    value (val) {
      this.tabClick(val)
    }
  },

  methods: {
    // Force v-tabs-bar to re-evaluate
    // overflow when items change
    callBar () {
      if (!this.bar.length || !this.activeTab) return

      this.bar[0].action(this.activeTab.el)
    },
    findActiveLink () {
      if (!this.tabItems.length) return

      const activeIndex = this.tabItems.findIndex(tabItem => {
        return tabItem.id === this.value ||
          tabItem.el.firstChild.className.indexOf('tabs__item--active') > -1
      })

      // If we found an active link
      if (activeIndex > -1) {
        return (this.activeIndex = activeIndex)
      }

      if (!this.isBooted &&
        this.content.length > 0 &&
        this.tabItems.length > 0
      ) {
        this.activeIndex = 0
      }
    },
    next (cycle) {
      let nextIndex = this.activeIndex + 1

      if (!this.tabItems[nextIndex]) {
        if (!cycle) return
        nextIndex = 0
      }

      this.activeIndex = nextIndex
    },
    prev (cycle) {
      let prevIndex = this.activeIndex - 1

      if (!this.tabItems[prevIndex]) {
        if (!cycle) return
        prevIndex = this.tabItems.length - 1
      }

      this.activeIndex = prevIndex
    },
    // Potential Vue bug,
    // pushing to this[type]
    // makes the tabItems
    // watcher new and old
    // items always match
    register (type, args) {
      const mask = this[type].slice()
      mask.push(args)

      this[type] = mask
    },
    tabClick (target) {
      this.activeIndex = this.tabItems.findIndex(tab => tab.id === target)
    },
    unregister (type, id) {
      // console.log(type, id)
      this[type] = this[type].filter(o => o.id !== id)
    },
    updateTabs () {
      this.content.forEach(({ toggle }) => {
        toggle(this.target, this.reverse, this.isBooted)
      })

      this.tabItems.forEach(({ toggle }) => {
        toggle(this.target)
      })

      this.callBar()
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'tabs'
    }, this.$slots.default)
  }
}
