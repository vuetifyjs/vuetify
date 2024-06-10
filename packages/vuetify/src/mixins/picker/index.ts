// Components
import VPicker from '../../components/VPicker'

// Mixins
import Colorable from '../colorable'
import Elevatable from '../../mixins/elevatable'
import Themeable from '../themeable'

// Utils
import mixins from '../../util/mixins'
import { getSlot } from '../../util/helpers'

// Types
import { VNode } from 'vue'

export default mixins(
  Colorable,
  Elevatable,
  Themeable
/* @vue/component */
).extend({
  name: 'picker',

  props: {
    flat: Boolean,
    fullWidth: Boolean,
    headerColor: String,
    landscape: Boolean,
    noTitle: Boolean,
    width: {
      type: [Number, String],
      default: 290,
    },
  },

  methods: {
    genPickerTitle (): VNode | null {
      return null
    },
    genPickerBody (): VNode | null {
      return null
    },
    genPickerActionsSlot () {
      return this.$scopedSlots.default ? this.$scopedSlots.default({
        save: (this as any).save,
        cancel: (this as any).cancel,
      }) : getSlot(this)
    },
    genPicker (staticClass: string) {
      const children: VNode[] = []

      if (!this.noTitle) {
        const title = this.genPickerTitle()
        title && children.push(title)
      }

      const body = this.genPickerBody()
      body && children.push(body)

      children.push(this.$createElement('template', { slot: 'actions' }, [this.genPickerActionsSlot()]))

      return this.$createElement(VPicker, {
        staticClass,
        props: {
          color: this.headerColor || this.color,
          dark: this.dark,
          elevation: this.elevation,
          flat: this.flat,
          fullWidth: this.fullWidth,
          landscape: this.landscape,
          light: this.light,
          width: this.width,
          noTitle: this.noTitle,
        },
      }, children)
    },
  },
})
