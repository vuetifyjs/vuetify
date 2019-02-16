// Styles
import './VBanner.sass'

// Components
import VSheet from '../VSheet'
import VIcon from '../VIcon'

// Mixins
import Toggleable from '../../mixins/toggleable'
import Transitionable from '../../mixins/transitionable'

// Types
import { VNode, VNodeData, VNodeChildren } from 'vue/types'
import mixins from '../../util/mixins'

/* @vue/component */
export default mixins(
  VSheet,
  Toggleable,
  Transitionable
).extend({
  name: 'v-banner',

  props: {
    icon: String,
    value: {
      type: Boolean,
      default: true
    },
    twoLine: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes (): object {
      return {
        ...VSheet.options.computed.classes.call(this),
        'v-banner--one-line': !this.twoLine,
        'v-banner--two-line': this.twoLine
      }
    }
  },

  methods: {
    /** @public */
    toggle () {
      this.isActive = !this.isActive
    },
    iconClick (e: MouseEvent) {
      this.$emit('click:icon', e)
    },
    genIcon () {
      let content

      if (this.icon) {
        content = this.$createElement(VIcon, {
          props: {
            size: 40
          }
        }, [ this.icon ])
      } else {
        content = this.$slots.icon
      }

      if (content) {
        return this.$createElement('div', {
          staticClass: 'v-banner__icon',
          on: {
            click: this.iconClick
          }
        }, [
          content
        ])
      } else {
        return undefined
      }
    },
    genContent () {
      return this.$createElement('div', { staticClass: 'v-banner__content' }, this.$slots.default)
    },
    genActions () {
      if (this.$slots.actions || this.$scopedSlots.actions) {
        return this.$createElement('div', { staticClass: 'v-banner__actions' }, this.$scopedSlots.actions ? this.$scopedSlots.actions({
          dismiss: () => this.isActive = false
        }) : this.$slots.actions)
      } else {
        return undefined
      }
    },
    genBanner () {
      const data: VNodeData = {
        staticClass: 'v-banner',
        class: this.classes,
        style: this.styles,
        directives: [{
          name: 'show',
          value: this.isActive
        }]
      }

      const children: VNodeChildren = [
        this.genIcon(),
        this.genContent(),
        this.genActions()
      ]

      return this.$createElement('div', data, children)
    }
  },

  render (h): VNode {
    const render = this.genBanner()

    /* istanbul ignore next */
    if (!this.transition) return render

    /* istanbul ignore next */
    return h('transition', {
      props: {
        name: this.transition,
        origin: this.origin,
        mode: this.mode
      }
    }, [render])
  }
})
