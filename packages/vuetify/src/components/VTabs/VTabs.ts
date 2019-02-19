// Styles
import './VTabs.sass'

// Components
import VTabsBar from './VTabsBar'
import VTabsItems from './VTabsItems'
import VTabsSlider from './VTabsSlider'

// Mixins
import Colorable from '../../mixins/colorable'
import Proxyable from '../../mixins/proxyable'
import SSRBootable from '../../mixins/ssr-bootable'

// Directives
import Resize from '../../directives/resize'

// Utilities
import { ExtractVue } from './../../util/mixins'
import mixins from '../../util/mixins'

// Types
import Vue from 'vue'
import { VNode } from 'vue/types'

interface options extends Vue {
  $refs: {
    items: InstanceType<typeof VTabsBar>
  }
}

const baseOptions = mixins(
  Colorable,
  Proxyable,
  SSRBootable
)

export default mixins<options & ExtractVue<typeof baseOptions>>(
  Colorable,
  Proxyable,
  SSRBootable
).extend({
  name: 'v-tabs',

  directives: {
    Resize
  },

  props: {
    activeClass: {
      type: String,
      default: 'v-tabs__window--active'
    },
    alignWithTitle: Boolean,
    centered: Boolean,
    fixedTabs: Boolean,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: undefined
    },
    hideSlider: Boolean,
    iconsAndText: Boolean,
    mobileBreakPoint: {
      type: [Number, String],
      default: 1264
    },
    nextIcon: {
      type: String,
      default: '$vuetify.icons.next'
    },
    prevIcon: {
      type: String,
      default: '$vuetify.icons.prev'
    },
    right: Boolean,
    showArrows: Boolean,
    sliderColor: {
      type: String,
      default: 'accent'
    }
  },

  data () {
    return {
      resizeTimeout: 0,
      sliderWidth: null as number | null,
      sliderLeft: null as number | null
    }
  },

  computed: {
    sliderStyles (): object {
      return {
        left: `${this.sliderLeft}px`,
        transition: this.sliderLeft != null ? null : 'none',
        width: `${this.sliderWidth}px`
      }
    }
  },

  watch: {
    alignWithTitle: 'callSlider',
    centered: 'callSlider',
    fixedTabs: 'callSlider',
    internalLazyValue: 'callSlider',
    isBooted: 'callSlider',
    right: 'callSlider',
    '$vuetify.application.left': 'onResize',
    '$vuetify.application.right': 'onResize'
  },

  methods: {
    callSlider () {
      if (this.hideSlider || !this.$refs.items.selectedItems.length) return false

      this.$nextTick(() => {
        // Give screen time to paint
        const activeTab = this.$refs.items.selectedItems[0]
        /* istanbul ignore if */
        if (!activeTab || !activeTab.$el) return
        const el = activeTab.$el as HTMLElement

        this.sliderWidth = el.scrollWidth
        this.sliderLeft = el.offsetLeft
      })

      return true
    },
    genBar (items: VNode[], slider: VNode[]) {
      return this.$createElement(VTabsBar, {
        props: {
          activeClass: 'v-tabs__item--active',
          // TODO: deprecate name
          appendIcon: this.nextIcon,
          // TODO: deprecate name
          prependIcon: this.prevIcon,
          mandatory: true,
          mobileBreakPoint: this.mobileBreakPoint,
          showArrows: this.showArrows,
          value: this.value
        },
        on: {
          change: (val: any) => {
            this.internalValue = val
          }
        },
        ref: 'items'
      }, [
        this.genSlider(slider),
        items
      ])
    },
    genItems (items: VNode[], item: VNode[]) {
      if (items.length > 0) return items
      if (!item.length) return null

      return this.$createElement(VTabsItems, {
        props: {
          activeClass: this.activeClass,
          value: this.value
        },
        on: {
          change: (val: any) => {
            this.internalValue = val
          }
        }
      }, item)
    },
    genSlider (items: VNode[]) {
      if (this.hideSlider) return undefined

      if (!items.length) {
        const slider = this.$createElement(VTabsSlider, {
          props: { color: this.sliderColor }
        })

        items = [slider]
      }

      return this.$createElement('div', {
        staticClass: 'v-tabs__slider-wrapper',
        style: this.sliderStyles
      }, items)
    },
    onResize () {
      if (this._isDestroyed) return

      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = window.setTimeout(this.callSlider, 0)
    },
    parseNodes () {
      const item = []
      const items = []
      const slider = []
      const tab = []
      const slot = this.$slots.default || []
      const length = slot.length

      for (let i = 0; i < length; i++) {
        const vnode = slot[i]

        if (vnode.componentOptions) {
          switch (vnode.componentOptions.Ctor.options.name) {
            case 'v-tabs-slider': slider.push(vnode)
              break
            case 'v-tabs-items': items.push(vnode)
              break
            case 'v-tab-item': item.push(vnode)
              break
            // case 'v-tab' - intentionally omitted
            default: tab.push(vnode)
          }
        } else {
          tab.push(vnode)
        }
      }

      return { tab, slider, items, item }
    }
  },

  render (h): VNode {
    const { tab, slider, items, item } = this.parseNodes()

    return h('div', {
      staticClass: 'v-tabs',
      directives: [{
        name: 'resize',
        modifiers: { quiet: true },
        value: this.onResize
      }]
    }, [
      this.genBar(tab, slider),
      this.genItems(items, item)
    ])
  }
})
