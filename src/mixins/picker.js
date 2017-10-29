import Colorable from './colorable'

export default {
  mixins: [Colorable],

  data () {
    return {
      defaultColor: 'accent',
      isSaving: false
    }
  },

  props: {
    actions: Boolean,
    autosave: Boolean,
    headerColor: String,
    landscape: Boolean,
    noTitle: Boolean,
    scrollable: Boolean,
    value: {
      required: true
    }
  },

  computed: {
    titleColor () {
      // If no headerColor/color is set then the default
      // title color will be taken from styles
      return this.headerColor || this.color
    }
  },

  methods: {
    save () {},
    cancel () {},
    genSlot () {
      return this.$scopedSlots.default({
        save: this.save,
        cancel: this.cancel
      })
    },
    genPickerTitle (children) {
      return this.$createElement('div', {
        staticClass: 'picker__title',
        'class': this._computedClasses
      }, children)
    }
  }
}
