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
    resizeTimeout: null,
    reverse: false,
    tabItems: [],
    target: null,
    transitionTime: 300
  }),

  props: {
    value: String
  },

  computed: {
    activeTab () {
      if (!this.tabItems.length) return undefined

      return this.tabItems[this.activeIndex]
    }
  },

  watch: {
    activeIndex () {
      this.updateTabs()
    },
    bar (val) {
      if (!val || !this.activeTab) return

      // Welcome to suggestions for solving
      // initial load positioning
      setTimeout(() => this.activeTab.toggle(this.activeTab.id), 100)
    },
    tabItems (newItems, oldItems) {
      // Tab item was removed and
      // there are still more
      if (oldItems.length > newItems.length &&
        newItems.length > 0
      ) {
        if (!newItems.find(o => o.id === this.target)) {
          const i = oldItems.findIndex(o => o.id === this.target)

          this.$nextTick(() => {
            this.activeIndex = this.tabItems[i > 0 ? i - 1 : 0].id
            this.target = this.activeIndex
          })
        }
      }
    },
    value () {
      this.tabClick(this.value)
    },
    '$vuetify.application.left' () {
      this.onContainerResize()
    },
    '$vuetify.application.right' () {
      this.onContainerResize()
    }
  },

  mounted () {
    // This is a workaround to detect if link is active
    // when being used as a router or nuxt link
    const i = this.tabItems.findIndex(tabItem => {
      return tabItem.id === this.value ||
        tabItem.el.firstChild.className.indexOf('tabs__item--active') > -1
    })

    const index = i > -1 ? i : 0
    if (index > this.tabItems.length - 1) return

    this.tabClick(this.tabItems[index].id)
  },

  methods: {
    next (cycle) {
      let nextIndex = this.activeIndex + 1

      if (!this.content[nextIndex]) {
        if (!cycle) return
        nextIndex = 0
      }

      this.tabClick(this.tabItems[nextIndex].id)
    },
    prev (cycle) {
      let prevIndex = this.activeIndex - 1

      if (!this.content[prevIndex]) {
        if (!cycle) return
        prevIndex = this.content.length - 1
      }

      this.tabClick(this.tabItems[prevIndex].id)
    },
    /**
     * When v-navigation-drawer changes the
     * width of the container, call resize
     * after the transition is complete
     *
     * @return {Void}
     */
    onContainerResize () {
      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(this.onResize, this.transitionTime)
    },
    register (type, args) {
      this[type].push(args)
    },
    tabClick (target) {
      const setActiveIndex = index => {
        if (this.activeIndex === index) {
          // #762 update tabs display
          // In case tabs count got changed but activeIndex didn't
          this.updateTabs()
        } else {
          this.activeIndex = index
        }
      }

      this.target = target

      this.$nextTick(() => {
        const nextIndex = this.content.findIndex(o => o.id === target)
        this.reverse = nextIndex < this.activeIndex
        setActiveIndex(nextIndex)

        this.$emit('input', this.target)
      })
    },
    unregister (type, id) {
      this[type] = this[type].filter(o => o.id !== id)
    },
    updateTabs () {
      this.content.forEach(({ toggle }) => {
        toggle(this.target, this.reverse, this.isBooted)
      })

      this.tabItems.forEach(({ toggle }) => {
        toggle(this.target)
      })
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'tabs'
    }, this.$slots.default)
  }
}
