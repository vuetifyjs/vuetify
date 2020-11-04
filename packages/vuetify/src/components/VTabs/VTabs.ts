// Styles
import './VTabs.sass'

// Components
import VTabsBar from './VTabsBar'
import VTabsItems from './VTabsItems'
import VTabsSlider from './VTabsSlider'

// Mixins
import Colorable from '../../mixins/colorable'
import Proxyable from '../../mixins/proxyable'
import Themeable from '../../mixins/themeable'

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
  Proxyable,
  Themeable
)

interface options extends ExtractVue<typeof baseMixins> {
  $refs: {
    items: InstanceType<typeof VTabsBar>
  }
}

export default baseMixins.extend<options>().extend({
  name: 'v-tabs',

  directives: {
    Resize,
  },

  props: {
    activeClass: {
      type: String,
      default: '',
    },
    alignWithTitle: Boolean,
    backgroundColor: String,
    centerActive: Boolean,
    centered: Boolean,
    fixedTabs: Boolean,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: undefined,
    },
    hideSlider: Boolean,
    iconsAndText: Boolean,
    mobileBreakpoint: [String, Number],
    nextIcon: {
      type: String,
      default: '$next',
    },
    optional: Boolean,
    prevIcon: {
      type: String,
      default: '$prev',
    },
    right: Boolean,
    showArrows: [Boolean, String],
    sliderColor: String,
    sliderSize: {
      type: [Number, String],
      default: 2,
    },
    vertical: Boolean,
  },

  data () {
    return {
      resizeTimeout: 0,
      slider: {
        height: null as null | number,
        left: null as null | number,
        right: null as null | number,
        top: null as null | number,
        width: null as null | number,
      },
      transitionTime: 300,
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
        'v-tabs--vertical': this.vertical,
        ...this.themeClasses,
      }
    },
    isReversed (): boolean {
      return this.$vuetify.rtl && this.vertical
    },
    sliderStyles (): object {
      return {
        height: convertToUnit(this.slider.height),
        left: this.isReversed ? undefined : convertToUnit(this.slider.left),
        right: this.isReversed ? convertToUnit(this.slider.right) : undefined,
        top: this.vertical ? convertToUnit(this.slider.top) : undefined,
        transition: this.slider.left != null ? null : 'none',
        width: convertToUnit(this.slider.width),
      }
    },
    computedColor (): string {
      if (this.color) return this.color
      else if (this.isDark && !this.appIsDark) return 'white'
      else return 'primary'
    },
  },

  watch: {
    alignWithTitle: 'callSlider',
    centered: 'callSlider',
    centerActive: 'callSlider',
    fixedTabs: 'callSlider',
    grow: 'callSlider',
    iconsAndText: 'callSlider',
    right: 'callSlider',
    showArrows: 'callSlider',
    vertical: 'callSlider',
    '$vuetify.application.left': 'onResize',
    '$vuetify.application.right': 'onResize',
    '$vuetify.rtl': 'onResize',
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
          height: !this.vertical ? Number(this.sliderSize) : el.scrollHeight,
          left: this.vertical ? 0 : el.offsetLeft,
          right: this.vertical ? 0 : el.offsetLeft + el.offsetWidth,
          top: el.offsetTop,
          width: this.vertical ? Number(this.sliderSize) : el.scrollWidth,
        }
      })

      return true
    },
    genBar (items: VNode[], slider: VNode | null) {
      const data = {
        style: {
          height: convertToUnit(this.height),
        },
        props: {
          activeClass: this.activeClass,
          centerActive: this.centerActive,
          dark: this.dark,
          light: this.light,
          mandatory: !this.optional,
          mobileBreakpoint: this.mobileBreakpoint,
          nextIcon: this.nextIcon,
          prevIcon: this.prevIcon,
          showArrows: this.showArrows,
          value: this.internalValue,
        },
        on: {
          'call:slider': this.callSlider,
          change: (val: any) => {
            this.internalValue = val
          },
        },
        ref: 'items',
      }

      this.setTextColor(this.computedColor, data)
      this.setBackgroundColor(this.backgroundColor, data)

      return this.$createElement(VTabsBar, data, [
        this.genSlider(slider),
        items,
      ])
    },
    genItems (items: VNode | null, item: VNode[]) {
      // If user provides items
      // opt to use theirs
      if (items) return items

      // If no tabs are provided
      // render nothing
      if (!item.length) return null

      return this.$createElement(VTabsItems, {
        props: {
          value: this.internalValue,
        },
        on: {
          change: (val: any) => {
            this.internalValue = val
          },
        },
      }, item)
    },
    genSlider (slider: VNode | null) {
      if (this.hideSlider) return null

      if (!slider) {
        slider = this.$createElement(VTabsSlider, {
          props: { color: this.sliderColor },
        })
      }

      return this.$createElement('div', {
        staticClass: 'v-tabs-slider-wrapper',
        style: this.sliderStyles,
      }, [slider])
    },
    onResize () {
      if (this._isDestroyed) return

      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = window.setTimeout(this.callSlider, 0)
    },
    parseNodes () {
      let items = null
      let slider = null
      const item = []
      const tab = []
      const slot = this.$slots.default || []
      const length = slot.length

      for (let i = 0; i < length; i++) {
        const vnode = slot[i]

        if (vnode.componentOptions) {
          switch (vnode.componentOptions.Ctor.options.name) {
            case 'v-tabs-slider': slider = vnode
              break
            case 'v-tabs-items': items = vnode
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

      /**
       * tab: array of `v-tab`
       * slider: single `v-tabs-slider`
       * items: single `v-tabs-items`
       * item: array of `v-tab-item`
       */
      return { tab, slider, items, item }
    },
  },

  render (h): VNode {
    const { tab, slider, items, item } = this.parseNodes()

    return h('div', {
      staticClass: 'v-tabs',
      class: this.classes,
      directives: [{
        name: 'resize',
        modifiers: { quiet: true },
        value: this.onResize,
      }],
    }, [
      this.genBar(tab, slider),
      this.genItems(items, item),
    ])
  },
})
