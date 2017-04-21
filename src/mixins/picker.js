export default {
  data () {
    return {
      isSaving: false
    }
  },

  props: {
    actions: Boolean,
    dark: Boolean,
    landscape: Boolean,
    noTitle: Boolean,
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
