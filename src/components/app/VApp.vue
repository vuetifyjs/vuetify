<script>
  import Themeable from '../../mixins/themeable'

  export default {
    name: 'v-app',

    functional: true,

    mixins: [Themeable],

    props: {
      fixedFooter: Boolean,
      footer: Boolean,
      id: {
        type: String,
        default: 'app'
      },
      toolbar: Boolean
    },

    render (h, { props, data, children }) {

      data.staticClass = (`application ${data.staticClass || ''}`).trim()
      data.staticClass += ` application--${props.dark ? 'dark' : 'light'}`

      props.footer && (data.staticClass += ' application--footer')
      props.fixedFooter && (data.staticClass += ' application--footer-fixed')
      props.toolbar && (data.staticClass += ' application--toolbar')

      data.attrs = { 'data-app': true }
      data.domProps = { id: props.id }

      return h('div', data, children)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_app.styl"></style>
