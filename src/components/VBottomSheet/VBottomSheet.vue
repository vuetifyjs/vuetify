<script>
  import VDialog from '../VDialog/VDialog'

  export default {
    name: 'v-bottom-sheet',

    components: {
      VDialog
    },

    props: ['value'],

    render (h) {
      const activator = h('template', {
        slot: 'activator'
      }, this.$slots.activator)

      return h(VDialog, {
        attrs: {
          ...this.$attrs
        },
        on: {
          ...this.$listeners
        },
        props: {
          contentClass: 'bottom-sheet',
          transition: 'bottom-sheet-transition',
          value: this.value
        }
      }, [activator, this.$slots.default])
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_bottom-sheets.styl"></style>
