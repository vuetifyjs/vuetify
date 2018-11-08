<script>
  import Script from './Script'

  export default {
    extends: Script,

    props: {
      scriptId: {
        type: String,
        default: '_carbonads_js'
      },
      src: {
        type: String,
        default: '//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=vuetifyjscom'
      }
    },

    methods: {
      serve () {
        window._carbonads.refresh()
      }
    }
  }
</script>

<style lang="stylus">
  #ad__container
    #carbonads
      display: flex
      justify-content: flex-start
      background-color: hsla(0, 0%, 98%, .9)
      z-index: 3
      margin-bottom: 48px

      a
        color: rgba(#000, .87)
        display: inline-block
        max-width: 130px
        text-decoration: none

        &.carbon-poweredby
          color: rgba(#000, .56)
          text-transform: uppercase
          letter-spacing: 1px
          font-size: 9px !important

        &.carbon-text
          display: block
          font-size: 12px
          margin-bottom: .5em
</style>
