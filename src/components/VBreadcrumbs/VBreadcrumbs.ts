import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { deprecate } from '../../util/console'

import '../../stylus/components/_breadcrumbs.styl'

/* @vue/component */
export default Vue.extend({
  name: 'v-breadcrumbs',

  props: {
    divider: {
      type: String,
      default: '/'
    },
    items: Array as PropValidator<object[]>,
    large: Boolean,
    justifyCenter: Boolean,
    justifyEnd: Boolean
  },

  computed: {
    classes (): object {
      return {
        'v-breadcrumbs--large': this.large,
        'justify-center': this.justifyCenter,
        'justify-end': this.justifyEnd
      }
    }
  },

  mounted () {
    if (this.justifyCenter) deprecate('justify-center', 'class="justify-center"', this)
    if (this.justifyEnd) deprecate('justify-end', 'class="justify-end"', this)
    if (this.$slots.default) deprecate('default slot', ':items and scoped slot "item"', this)
  },

  methods: {
    /**
     * Add dividers between
     * v-breadcrumbs-item
     *
     * @return {array}
     */
    genChildren () {
      if (!this.$slots.default) return undefined

      const children = []

      let createDividers = false
      for (let i = 0; i < this.$slots.default.length; i++) {
        const elm = this.$slots.default[i]

        if (
          !elm.componentOptions ||
          elm.componentOptions.Ctor.options.name !== 'v-breadcrumbs-item'
        ) {
          children.push(elm)
        } else {
          if (createDividers) {
            children.push(this.genDivider())
          }
          children.push(elm)
          createDividers = true
        }
      }

      return children
    },
    genDivider () {
      return this.$createElement('li', {
        staticClass: 'v-breadcrumbs__divider'
      }, this.$slots.divider ? this.$slots.divider : this.divider)
    },
    genItems () {
      if (!this.$scopedSlots.item) return undefined

      const items = []

      for (let i = 0; i < this.items.length; i++) {
        items.push(this.$scopedSlots.item({ item: this.items[i] }))

        if (i < this.items.length - 1) items.push(this.genDivider())
      }

      return items
    }
  },

  render (h): VNode {
    const children = this.$slots.default ? this.genChildren() : this.genItems()

    return h('ul', {
      staticClass: 'v-breadcrumbs',
      'class': this.classes
    }, children)
  }
})
