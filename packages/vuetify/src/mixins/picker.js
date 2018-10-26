// Components
import VPicker from '../components/VPicker'

// Mixins
import Colorable from './colorable'
import Themeable from './themeable'

/* @vue/component */
export default {
  name: 'picker',

  mixins: [
    Colorable,
    Themeable
  ],

  props: {
    fullWidth: Boolean,
    headerColor: String,
    landscape: Boolean,
    noTitle: Boolean,
    width: {
      type: [Number, String],
      default: 290
    }
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
      return this.$createElement(VPicker, {
        staticClass,
        props: {
          color: this.headerColor || this.color,
          dark: this.dark,
          fullWidth: this.fullWidth,
          landscape: this.landscape,
          light: this.light,
          width: this.width
        }
      }, [
        this.noTitle ? null : this.genPickerTitle(),
        this.genPickerBody(),
        this.$createElement('template', { slot: 'actions' }, [this.genPickerActionsSlot()])
      ])
    }
  }
}
