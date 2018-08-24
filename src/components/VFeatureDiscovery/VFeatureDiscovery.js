// Styles
import '../../stylus/components/_feature-discovery.styl'

// Mixins
import Colorable from '../../mixins/colorable'
import Overlayable from '../../mixins/overlayable'
import Toggleable from '../../mixins/toggleable'

// Directives
import ClickOutside from '../../directives/click-outside'

export default {
  name: 'v-feature-discovery',

  directives: {
    ClickOutside
  },

  mixins: [
    Colorable,
    Overlayable,
    Toggleable
  ],

  props: {
    persistent: Boolean,
    top: Boolean,
    left: Boolean,
    flat: Boolean,
    height: {
      default: 400,
      type: [Number, String],
      validator: v => !isNaN(parseInt(v))
    }
  },

  data: () => ({
    initiated: false
  }),

  computed: {
    classes () {
      return {
        'v-feature-discovery--flat': this.flat,
        'v-feature-discovery--active': this.isActive && this.initiated,
        'v-feature-discovery--top-left': this.top && this.left,
        'v-feature-discovery--top-right': this.top && !this.left,
        'v-feature-discovery--bottom-left': !this.top && this.left,
        'v-feature-discovery--bottom-right': !this.top && !this.left,
        ...this.themeClasses
      }
    },
    OuterContainerClasses () {
      return {
        [`justify-${this.left ? 'start' : 'end'}`]: true,
        [`align-${this.top ? 'baseline' : 'end'}`]: true
      }
    },
    titleClasses () {
      return {
        'mr-4': this.left && !this.top,
        'ml-4 mt-3': !this.left && !this.top,
        'align-end': true
      }
    },
    actionsClasses () {
      return {
        'mr-5': this.left && this.top,
        'ml-5': !this.left && this.top
      }
    },
    textClasses () {
      return {
        'align-center': true
      }
    },
    computedHeight () {
      return parseInt(this.height)
    }
  },

  watch: {
    isActive (val) {
      if (val) this.genOverlay()
      else this.removeOverlay()
    }
  },

  methods: {
    init () {
      if (this.isActive) {
        this.genOverlay()
      }
      this.initiated = true
    },

    genDirectives () {
      const directives = [{
        name: 'click-outside',
        value: () => (this.isActive = false),
        args: {
          closeConditional: this.closeConditional
        }
      }]
      return directives
    },
    closeConditional (e) {
      return !this.persistent && this.isActive
    },
    genContent () {
      return this.$createElement(
        'div',
        {
          staticClass: 'v-feature-discovery-outer-container layout row wrap fill-height',
          class: this.OuterContainerClasses
        },
        [this.genContainer()]
      )
    },
    genContainer () {
      return this.$createElement(
        'div',
        {
          staticClass: 'v-feature-discovery-container flex fill-height',
          style: {
            maxWidth: `${this.computedHeight - (this.computedHeight * 0.15)}px`,
            maxHeight: `${this.computedHeight - (this.computedHeight * 0.2)}px`
          }
        },
        [this.genInnerContainer()]
      )
    },
    genInnerContainer () {
      return this.$createElement(
        'div',
        { staticClass: 'v-feature-discovery-inner-container layout pa-2 column fill-height' },
        [this.genInnerContent()]
      )
    },
    genInnerContent () {
      const content = ['title', 'text', 'actions']
      return content.map(x => {
        return this.$createElement(
          'div',
          {
            staticClass: `v-feature-discovery-${x} flex d-flex text-xs-center`,
            class: this[`${x}Classes`]
          },
          [this.$slots[x]]
        )
      })
    }
  },

  mounted () {
    this.init()
  },

  render (h) {
    const data = {
      directives: this.genDirectives(),
      staticClass: 'v-feature-discovery',
      class: this.classes,
      style: {
        height: `${parseInt(this.computedHeight)}px`,
        width: `${parseInt(this.computedHeight)}px`
      },
      ref: 'content'
    }

    const children = [this.genContent()]

    // const featureDiscoveryTitle = h('div', {
    //   staticClass: 'v-feature-discovery-title flex d-flex text-xs-center',
    //   class: this.featureDiscoveryTitleClasses
    // }, [this.$slots.title])
    //
    // const featureDiscoveryText = h('div', {
    //   staticClass: 'v-feature-discovery-text flex d-flex text-xs-center align-center'
    // }, [this.$slots.text])
    //
    // const featureDiscoveryActions = h('div', {
    //   staticClass: 'v-feature-discovery-actions flex d-flex text-xs-center align-baseline',
    //   class: this.featureDiscoveryActionsClasses
    // }, [this.$slots.actions])

    return h('div', this.setBackgroundColor(this.color, data), children)
  }
}
