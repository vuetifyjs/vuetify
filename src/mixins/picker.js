import Themeable from './themeable'

export default {
  mixins: [Themeable],

  data () {
    return {
      isSaving: false
    }
  },

  props: {
    actions: Boolean,
    landscape: Boolean,
    noTitle: Boolean,
    scrollable: Boolean,
    value: {
      required: true
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
    }
  }
}
