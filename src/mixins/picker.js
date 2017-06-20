export default {
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
    },
    light: {
      type: Boolean,
      default: true
    },
    dark: Boolean,
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
