// Components
import VPicker from '../components/VPicker'

// Mixins
import Colorable from './colorable'
import Themeable from './themeable'

export default {
  name: 'picker',

  components: {
    VPicker
  },

  mixins: [
    Colorable,
    Themeable
  ],

  props: {
    headerColor: String,
    landscape: Boolean,
    noTitle: Boolean
  },

  methods: {
    genPickerTitle () {},
    genPickerBody () {},
    genPickerActionsSlot () {
      return this.$scopedSlots.default ? this.$scopedSlots.default({
        save: this.save,
        cancel: this.cancel
      }) : this.$slots.default
    },
    genPicker (staticClass) {
      return this.$createElement('v-picker', {
        staticClass,
        props: {
          landscape: this.landscape,
          dark: this.dark,
          light: this.light,
          color: this.headerColor || this.color
        }
      }, [
        this.noTitle ? null : this.genPickerTitle(),
        this.genPickerBody(),
        this.$createElement('template', { slot: 'actions' }, [this.genPickerActionsSlot()])
      ])
    }
  }
}
