<script>
  import Script from './Script'

  export default {
    extends: Script,

    props: {
      id: {
        type: String,
        default: 'codefund_ad'
      },
      src: {
        type: String,
        default: '//codefund.io/scripts/50bda123-f278-4574-88e2-c7401f869261/embed.js'
      }
    },

    methods: {
      serve () {
        window._codefund.serve()
      }
    }
  }
</script>

<style lang="stylus">
  #ad__container
    #cf_ad
      .cf-wrapper
        border-radius: 4px
        .cf-img-wrapper
          margin-bottom: 16px
    .v-system-bar,
    .v-bottom-navigation
      #codefund_ad
        height: 100%
        width: 100%
      .cf-img-wrapper
        display: none
      #cf_ad
        height: 100%
        margin: 0
        max-width: 100%
        .cf-powered-by
          margin-top: 0
          margin-left: auto
        > span > .cf-wrapper
          align-items: center
          display: flex
          height: 100%
          padding: 0
    .v-system-bar
      padding: 0
      #cf_ad
        > span > .cf-wrapper
          padding: 0 8px
          > a
            font-size: 12px
          a.cf-powered-by
            font-size: 9px
    .v-bottom-navigation
      #cf_ad
        > span > .cf-wrapper
          .cf-text
            padding-right: 24px
          &:before
            background: #08c
            border-radius: 4px
            content: 'Advertiser'
            color: white
            font-size: 12px
            font-weight: 500
            margin: 0 8px
            padding: 4px
</style>
