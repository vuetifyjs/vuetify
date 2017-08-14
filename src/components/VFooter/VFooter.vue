<script>
  export default {
    name: 'v-footer',

    functional: true,

    props: {
      absolute: Boolean,
      fixed: Boolean
    },

    render (h, { data, props, children }) {
      data.staticClass = (`footer ${data.staticClass || ''}`).trim()

      if (props.absolute) data.staticClass += ' footer--absolute'
      if (props.fixed) data.staticClass += ' footer--fixed'

      return h('footer', data, children)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_footer.styl"></style>
