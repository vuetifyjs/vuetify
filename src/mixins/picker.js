import Colorable from './colorable'
import Themeable from './themeable'

export default {
  mixins: [Colorable, Themeable],

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
      const darkTheme = this.dark || (!this.light && this.$vuetify.dark)
      const defaultTitleColor = darkTheme ? null : 'primary'
      return this.headerColor || this.color || defaultTitleColor
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
        'class': this.addBackgroundColorClassChecks({}, 'titleColor')
      }, children)
    }
  }
}
