import VRowExpandable from './VRowExpandable'
import VCell from './VCell'
import VRow from './VRow'
import VBtn from '../VBtn'
import VIcon from '../VIcon'

export default {
  name: 'v-row-group',
  extends: VRowExpandable,
  props: {
    value: {
      type: Boolean,
      default: true
    },
    disableExpansion: {
      type: Boolean
    }
  },
  methods: {
    genRow (h) {
      if (this.$slots.header) return this.$slots.header

      if (this.disableExpansion) return null

      return h(VRow, {
        staticClass: 'v-row-group__header'
      }, [
        h(VCell, [
          h(VBtn, {
            props: {
              icon: true,
              small: true
            },
            on: {
              click: this.toggle
            }
          }, [
            h(VIcon, [this.isActive ? 'keyboard_arrow_down' : 'keyboard_arrow_right'])
          ]),
          this.$slots.cell
        ])
      ])
    }
  }
}
