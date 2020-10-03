// Styles
import './VList.sass'
import VListGroup from './VListGroup'

// Components
import VSheet from '../VSheet/VSheet'

// Types
import { defineComponent, h } from 'vue'

type VListGroupInstance = InstanceType<typeof VListGroup>

interface options extends InstanceType<typeof VSheet> {
  isInMenu: boolean
  isInNav: boolean
}

export default defineComponent({
  name: 'v-list',

  extends: VSheet,

  provide (): object {
    return {
      isInList: true,
      list: this,
    }
  },

  inject: {
    isInMenu: {
      default: false,
    },
    isInNav: {
      default: false,
    },
  },

  props: {
    dense: Boolean,
    disabled: Boolean,
    expand: Boolean,
    flat: Boolean,
    nav: Boolean,
    rounded: Boolean,
    subheader: Boolean,
    threeLine: Boolean,
    twoLine: Boolean,
  },

  data: () => ({
    groups: [] as VListGroupInstance[],
  }),

  computed: {
    classes (): object {
      return {
        ...VSheet.computed!.classes.call(this),
        'v-list--dense': this.dense,
        'v-list--disabled': this.disabled,
        'v-list--flat': this.flat,
        'v-list--nav': this.nav,
        'v-list--rounded': this.rounded,
        'v-list--subheader': this.subheader,
        'v-list--two-line': this.twoLine,
        'v-list--three-line': this.threeLine,
      }
    },
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
    },
  },

  render () {
    const data = {
      class: ['v-list', this.classes],
      style: this.styles,
      role: this.isInNav || this.isInMenu ? undefined : 'list',
    }

    return h(
      this.tag,
      this.setBackgroundColor(this.color, data),
      this.$slots.default?.()
    )
  },
})
