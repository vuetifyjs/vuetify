// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'
import Routable from '../../mixins/routable'

// Utilities
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue/types'

export default mixins(
  Routable,
  GroupableFactory('tabsBar')
  /* @vue/component */
).extend({
  name: 'v-tab',

  computed: {
    classes (): object {
      return {
        'v-tabs__item': true,
        ...this.groupClasses
      }
    },
    styles () {
      return {}
    }
  },

  methods: {
    click (e: MouseEvent): void {
      this.$emit('click', e)

      this.tabsBar && this.toggle()
    }
  },

  render (h): VNode {
    const { tag, data } = this.generateRouteLink(this.classes, this.styles)

    return h(tag, data, this.$slots.default)
  }
})
