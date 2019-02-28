// Styles
import './VTabs.sass'

// Components
import VTabsBar from './VTabsBar'
import VTabsItems from './VTabsItems'
import VTabsSlider from './VTabsSlider'

// Mixins
import Colorable from '../../mixins/colorable'
import Proxyable from '../../mixins/proxyable'

// Directives
import Resize from '../../directives/resize'

// Utilities
import { convertToUnit } from '../../util/helpers'
import { ExtractVue } from './../../util/mixins'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue/types'

const baseMixins = mixins(
  Colorable,
  Proxyable
)

interface options extends ExtractVue<typeof baseMixins> {
  $refs: {
    items: InstanceType<typeof VTabsBar>
  }
}

export default baseMixins.extend<options>().extend({
  name: 'v-tabs',

  directives: {
    Resize
  },

  props: {
    activeClass: {
      type: String,
      default: 'v-tabs__item--active'
    },
    alignWithTitle: Boolean,
    backgroundColor: String,
    centered: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    dark: Boolean,
    fixedTabs: Boolean,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: undefined
    },
    hideSlider: Boolean,
    iconsAndText: Boolean,
    light: Boolean,
    mobileBreakPoint: {
      type: [Number, String],
      default: 1264
    },
    nextIcon: {
      type: String,
      default: '$vuetify.icons.next'
    },
    optional: Boolean,
    prevIcon: {
      type: String,
      default: '$vuetify.icons.prev'
    },
    right: Boolean,
    showArrows: Boolean,
    sliderColor: String,
    vertical: Boolean
  },

  data () {
    return {
      resizeTimeout: 0,
      slider: {
        height: null as null | number,
        left: null as null | number,
        top: null as null | number,
        width: null as null | number
      } as Record<string, number | null>,
      transitionTime: 300
    }
  },

  computed: {
    classes (): object {
      return {
        'v-tabs--align-with-title': this.alignWithTitle,
        'v-tabs--centered': this.centered,
        'v-tabs--fixed-tabs': this.fixedTabs,
        'v-tabs--grow': this.grow,
        'v-tabs--icons-and-text': this.iconsAndText,
        'v-tabs--right': this.right,
        'v-tabs--vertical': this.vertical
      }
    },
    sliderStyles (): object {
      return {
        left: convertToUnit(this.slider.left),
        top: this.vertical ? convertToUnit(this.slider.top) : undefined,
        height: convertToUnit(this.slider.height),
        transition: this.slider.left != null ? null : 'none',
        width: convertToUnit(this.slider.width)
      }
    }
  },

  watch: {
    alignWithTitle: 'callSlider',
    centered: 'callSlider',
    fixedTabs: 'callSlider',
    right: 'callSlider',
    vertical: 'callSlider',
    '$vuetify.application.left': 'onResize',
    '$vuetify.application.right': 'onResize'
  },

  mounted () {
    this.$nextTick(() => {
      window.setTimeout(this.callSlider, 30)
    })
  },

  methods: {
    callSlider () {
      if (
        this.hideSlider ||
        !this.$refs.items ||
        !this.$refs.items.selectedItems.length
      ) {
        this.slider.width = 0
        return false
      }

      this.$nextTick(() => {
        // Give screen time to paint
        const activeTab = this.$refs.items.selectedItems[0]
        /* istanbul ignore if */
        if (!activeTab || !activeTab.$el) {
          this.slider.width = 0
          this.slider.left = 0
          return
        }
        const el = activeTab.$el as HTMLElement

        this.slider = {
          top: el.offsetTop,
          height: !this.vertical ? 2 : el.offsetHeight,
          left: !this.vertical ? el.offsetLeft : 0,
          width: !this.vertical ? el.scrollWidth : 2
        }
      })

      return true
    },
    genBar (items: VNode[], slider: VNode[]) {
      return this.$createElement(VTabsBar, this.setTextColor(this.color, {
        staticClass: this.backgroundColor,
        style: {
          height: this.height ? {
            height: convertToUnit(this.height)
          } : null
        },
        props: {
          activeClass: this.activeClass,
          // TODO: deprecate name
          appendIcon: this.nextIcon,
          dark: this.dark,
          light: this.light,
          // TODO: deprecate name
          prependIcon: this.prevIcon,
          mandatory: !this.optional,
          mobileBreakPoint: this.mobileBreakPoint,
          showArrows: this.showArrows,
          value: this.internalValue
        },
        on: {
          'call:slider': this.callSlider,
          change: (val: any) => {
            this.internalValue = val
          }
        },
        ref: 'items'
      }), [
        this.genSlider(slider),
        items
      ])
    },
    genItems (items: VNode[], item: VNode[]) {
      if (items.length > 0) return items
      if (!item.length) return null

      return this.$createElement(VTabsItems, {
        props: {
          value: this.internalValue
        },
        on: {
          change: (val: any) => {
            this.internalValue = val
          }
        }
      }, item)
    },
    genSlider (items: VNode[]) {
      if (this.hideSlider) return null

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
      class: this.classes,
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
