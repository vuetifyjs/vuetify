export default {
  methods: {
    genDefaultProgress () {
      return this.$createElement('v-progress-linear', {
        props: {
          color: (typeof this.loading === 'string' && this.loading) ? this.loading : 'primary',
          height: 3,
          indeterminate: true
        }
      })
    },
    genTProgress () {
      const progress = this.$slots.progress || this.genDefaultProgress()
      const col = this.$createElement('th', {
        staticClass: 'column',
        attrs: {
          colspan: '100%'
        }
      }, this.loading !== false ? [progress] : null)

      return this.$createElement('thead', {
        staticClass: 'datatable__progress'
      }, [this.genTR([col])])
    }
  }
}
