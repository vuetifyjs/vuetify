// Styles
import './VList.sass'
import VListGroup from './VListGroup'

// Mixins
import Themeable from '../../mixins/themeable'

// Types
import mixins from '../../util/mixins'
import { VNode } from 'vue'

type VListGroupInstance = InstanceType<typeof VListGroup>

export default mixins(
  Themeable
  /* @vue/component */
).extend({
  name: 'v-list',

  provide (): object {
    return {
      list: this
    }
  },

  props: {
    dense: Boolean,
    disabled: Boolean,
    expand: Boolean,
    flat: Boolean,
    nav: Boolean,
    shaped: Boolean,
    subheader: Boolean,
    threeLine: Boolean,
    twoLine: Boolean
  },

  data: () => ({
    groups: [] as VListGroupInstance[]
  }),

  computed: {
    classes (): object {
      return {
        'v-list--dense': this.dense,
        'v-list--disabled': this.disabled,
        'v-list--flat': this.flat,
        'v-list--nav': this.nav,
        'v-list--shaped': this.shaped,
        'v-list--subheader': this.subheader,
        'v-list--two-line': this.twoLine,
        'v-list--three-line': this.threeLine,
        ...this.themeClasses
      }
    }
  },

  methods: {
    register (content: VListGroupInstance) {
      this.groups.push(content)
    },
    unregister (content: VListGroupInstance) {
      const index = this.groups.findIndex(g => g._uid === content._uid)

      if (index > -1) this.groups.splice(index, 1)
    },
    listClick (uid: number) {
      if (this.expand) return

      for (const group of this.groups) {
        group.toggle(uid)
      }
    }
  },

  render (h): VNode {
    const data = {
      staticClass: 'v-list',
      class: this.classes,
      attrs: {
        role: 'list'
      }
    }

    return h('div', data, [this.$slots.default])
  }
})
