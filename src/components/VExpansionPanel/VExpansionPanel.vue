<script>
  export default {
    name: 'v-expansion-panel',

    provide () {
      return {
        expand: () => this.expand
      }
    },

    props: {
      expand: Boolean
    },

    render (h) {
      return h('ul', {
        'class': 'expansion-panel'
      }, this.$slots.default)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_expansion-panel.styl"></style>
