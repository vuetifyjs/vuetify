// Styles
import './VFeatureDiscovery.sass'

// Mixins
import Colorable from '../../mixins/colorable'
import Toggleable from '../../mixins/toggleable'
import Themeable from '../../mixins/themeable'
import { factory as PositionableFactory } from '../../mixins/positionable'

// Types
import { VNode, VNodeChildren } from 'vue'
import mixins from '../../util/mixins'

// Directives
import ClickOutside from '../../directives/click-outside'

export default mixins(
  Colorable,
  Toggleable,
  Themeable,
  PositionableFactory(['left', 'top'])
  /* @vue/component */
).extend({
  name: 'v-feature-discovery',

  directives: { ClickOutside },

  props: {
    persistent: Boolean,
    flat: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    size: {
      default: 400,
      type: [Number, String],
      validator: (v: string | number): boolean => !isNaN(parseInt(v))
    },
    value: {
      default: true
    }
  },

  computed: {
    classes (): object {
      return {
        'v-feature-discovery--flat': this.flat,
        'v-feature-discovery--active': this.isActive,
        'v-feature-discovery--top-left': this.top && this.left,
        'v-feature-discovery--top-right': this.top && !this.left,
        'v-feature-discovery--bottom-left': !this.top && this.left,
        'v-feature-discovery--bottom-right': !this.top && !this.left,
        ...this.themeClasses
      }
    },
    OuterContainerClasses (): object {
      return {
        [`justify-${this.left ? 'start' : 'end'}`]: true,
        [`align-${this.top ? 'baseline' : 'end'}`]: true
      }
    },
    innerContentClasses (): any {
      return {
        title: {
          'mr-4': this.left && !this.top,
          'ml-4 mt-3': !this.left && !this.top,
          'align-end': true
        },
        text: {
          'align-center': true
        },
        actions: {
          'mr-5': this.left && this.top,
          'ml-5': !this.left && this.top
        }
      }
    },
    computedSize (): number {
      return parseInt(this.size)
    }
  },

  methods: {
    closeConditional (): boolean {
      return !this.persistent && this.isActive
    },
    genContent (): VNode {
      return this.$createElement(
        'div',
        {
          staticClass: 'v-feature-discovery-outer-container layout row wrap fill-height',
          class: this.OuterContainerClasses
        },
        [this.genContainer()]
      )
    },
    genContainer (): VNode {
      return this.$createElement(
        'div',
        {
          staticClass: 'v-feature-discovery-container flex fill-height',
          style: {
            maxWidth: `${this.computedSize - (this.computedSize * 0.15)}px`,
            maxHeight: `${this.computedSize - (this.computedSize * 0.2)}px`
          }
        },
        [this.genInnerContainer()]
      )
    },
    genInnerContainer (): VNode {
      const children: VNodeChildren = this.genInnerContent()
      return this.$createElement(
        'div',
        { staticClass: 'v-feature-discovery-inner-container layout pa-2 column fill-height' },
        children
      )
    },
    genInnerContent (): VNodeChildren {
      const content = ['title', 'text', 'actions']
      return content.map(x => {
        return this.$createElement(
          'div',
          {
            staticClass: `v-feature-discovery-${x} flex d-flex text-xs-center`,
            'class': this.innerContentClasses[x]
          },
          [this.$slots[x]]
        )
      })
    }
  },

  render (h): VNode {
    const data = {
      directives: [{
        name: 'click-outside',
        value: () => (this.isActive = false),
        args: {
          closeConditional: this.closeConditional
        }
      }] as any,
      staticClass: 'v-feature-discovery',
      class: this.classes,
      style: {
        height: `${parseInt(this.computedSize)}px`,
        width: `${parseInt(this.computedSize)}px`
      },
      ref: 'content'
    }

    const children = [this.genContent()]

    return h('div', this.setBackgroundColor(this.color, data), children)
  }
})
