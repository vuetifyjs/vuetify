import Vue from 'vue'

export default Vue.extend({
  name: 'mobile',

  props: {
    mobileBreakPoint: {
      type: [Number, String],
      default (): number {
        return this.$vuetify.breakpoint.mobileBreakPoint
      },
      validator: (v: any) => !isNaN(parseInt(v)),
    },
  },

  computed: {
    isMobile (): boolean {
      return (
        this.$vuetify.breakpoint.mobile ||
        this.$vuetify.breakpoint.width < parseInt(this.mobileBreakPoint, 10)
      )
    },
  },
})
