<script>
  import Themeable from '../../mixins/themeable'

  export default {
    name: 'v-system-bar',

    functional: true,

    mixins: [Themeable],

    props: {
      lightsOut: Boolean,
      status: Boolean,
      window: Boolean
    },

    render (h, { data, props, children }) {
      data.staticClass = (`system-bar ${data.staticClass || ''}`).trim()

      if (props.dark) data.staticClass += ' theme--dark'
      if (props.light) data.staticClass += ' theme--light'
      if (props.status) data.staticClass += ' system-bar--status'
      if (props.window) data.staticClass += ' system-bar--window'
      if (props.lightsOut) data.staticClass += ' system-bar--lights-out'

      return h('div', data, children)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_system-bars.styl"></style>
