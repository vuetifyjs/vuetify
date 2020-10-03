// Styles
import './VBreadcrumbs.sass'

// Types
import type { VNode, Prop } from 'vue'

// Components
import VBreadcrumbsItem from './VBreadcrumbsItem'
import VBreadcrumbsDivider from './VBreadcrumbsDivider'

// Mixins
import Themeable from '../../mixins/themeable'

// Utils
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'v-breadcrumbs',

  mixins: [
    Themeable,
  ],

  props: {
    divider: {
      type: String,
      default: '/',
    },
    items: {
      type: Array,
      default: () => ([]),
    } as Prop<any[]>,
    large: Boolean,
  },

  computed: {
    classes (): object {
      return {
        'v-breadcrumbs': true,
        'v-breadcrumbs--large': this.large,
        ...this.themeClasses,
      }
    },
  },

  methods: {
    genDivider () {
      return h(VBreadcrumbsDivider, this.$slots.divider ? this.$slots.divider() : this.divider)
    },
    genItems () {
      const items = []
      const hasSlot = !!this.$slots.item
      const keys = []

      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i]

        keys.push(item.text)

        if (hasSlot) items.push(this.$slots.item!({ item }))
        else items.push(h(VBreadcrumbsItem, { key: keys.join('.'), ...item }, [item.text]))

        if (i < this.items.length - 1) items.push(this.genDivider())
      }

      return items
    },
  },

  render (): VNode {
    const children = this.$slots.default?.() || this.genItems()

    return h('ul', {
      class: this.classes,
    }, children)
  },
})
