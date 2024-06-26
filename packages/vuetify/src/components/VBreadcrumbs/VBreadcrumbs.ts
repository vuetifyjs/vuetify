// Styles
import './VBreadcrumbs.sass'

// Types
import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

// Components
import VBreadcrumbsItem from './VBreadcrumbsItem'
import VBreadcrumbsDivider from './VBreadcrumbsDivider'

// Mixins
import Themeable from '../../mixins/themeable'

// Utils
import mixins from '../../util/mixins'
import { getSlot } from '../../util/helpers'

export default mixins(
  Themeable
  /* @vue/component */
).extend({
  name: 'v-breadcrumbs',

  props: {
    divider: {
      type: String,
      default: '/',
    },
    items: {
      type: Array,
      default: () => ([]),
    } as PropValidator<any[]>,
    large: Boolean,
  },

  computed: {
    classes (): object {
      return {
        'v-breadcrumbs--large': this.large,
        ...this.themeClasses,
      }
    },
  },

  methods: {
    genDivider () {
      return this.$createElement(VBreadcrumbsDivider, this.$slots.divider ? this.$slots.divider : this.divider)
    },
    genItems () {
      const items = []
      const hasSlot = !!this.$scopedSlots.item
      const keys = []

      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i]

        keys.push(item.text)

        if (hasSlot) items.push(this.$scopedSlots.item!({ item }))
        else items.push(this.$createElement(VBreadcrumbsItem, { key: keys.join('.'), props: item }, [item.text]))

        if (i < this.items.length - 1) items.push(this.genDivider())
      }

      return items
    },
  },

  render (h): VNode {
    const children = getSlot(this) || this.genItems()

    return h('ul', {
      staticClass: 'v-breadcrumbs',
      class: this.classes,
    }, children)
  },
})
