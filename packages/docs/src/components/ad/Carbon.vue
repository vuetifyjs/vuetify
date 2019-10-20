<script>
  import Script from './Script'

  export default {
    extends: Script,

    props: {
      scriptId: {
        type: String,
        default: '_carbonads_js',
      },
      src: {
        type: String,
        default: '//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=vuetifyjscom',
      },
    },

    methods: {
      serve () {
        window._carbonads && window._carbonads.refresh()
      },
    },
  }
</script>

<style lang="sass">
  #carbonads
    .carbon-wrap
      display: flex

      img
        margin-bottom: -6px

    .carbon-text,
    .carbon-poweredby
      max-width: 200px
      padding: 0 0 0 16px
      text-decoration: none

    .carbon-text
      color: #333
      font-size: 0.875rem

    .carbon-poweredby
      color: rgba(0, 0, 0, .56)
      font-size: 0.75rem
      position: absolute
      right: 16px
      bottom: 16px

    // a
    //   color: #000
    //   display: inline-block
    //   text-decoration: none

    //   &.carbon-poweredby
    //     color: rgba(#000, .87)
    //     text-transform: uppercase
    //     letter-spacing: 1px
    //     font-size: 9px !important
    //     max-width: 42px

    //   &.carbon-text
    //     display: block
    //     font-size: 12px
    //     margin-bottom: .5em

    // .carbon-poweredby
    //   white-space: nowrap
</style>
