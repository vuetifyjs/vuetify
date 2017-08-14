<script>
  export default {
    name: 'v-bottom-nav',
    functional: true,

    props: {
      absolute: Boolean,
      shift: Boolean,
      value: { required: false }
    },

    render (h, { data, props, children }) {
      data.staticClass = (`bottom-nav ${data.staticClass || ''}`).trim()

      if (props.absolute) data.staticClass += ' bottom-nav--absolute'
      if (props.shift) data.staticClass += ' bottom-nav--shift'
      if (props.value) data.staticClass += ' bottom-nav--active'

      return h('div', data, children)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_bottom-navs.styl"></style>
