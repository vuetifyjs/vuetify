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
  #ad__container {
    #carbonads {
      a {
        color: rgba(#000, .87);
        display: inline-block;
        text-decoration: none;

        &.carbon-poweredby {
          color: rgba(#000, .56);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 9px !important;
          max-width: 42px;
        }
      }
    }

    .v-system-bar {
      > div {
        flex: 1 1 100%
      }

      .carbon-wrap {
        display: flex;
      }
    }

    .v-system-bar,
    .v-bottom-nav {
      #carbonads {
        height: 100%;

        > span {
          display: flex;
          height: 100%;
        }
      }

      .carbon-img {
        > img {
          margin-right: 8px;
          max-width: 48px !important;
          min-height: 32px;
          height: 100%;
          vertical-align: middle;
        }
      }
    }

    .v-system-bar #carbonads {
      .carbon-text {
        font-size: 10px;
        padding-right: 8px;
      }

      .carbon-wrap {
        flex: 1 1 70%;
      }
    }

    .v-bottom-nav #carbonads {
      padding: 0 16px;

      > span {
        align-items: center;
        justify-content: space-between;
      }
    }

    .v-navigation-drawer #carbonads {
      display: flex;
      justify-content: flex-start;
      z-index: 3;
      margin-bottom: 48px;

      > span {
        background: rgba(#000, .03);
        padding: 8px;
      }

      .carbon-img > img {
        max-width: 130px;
      }

      a {
        &.carbon-text {
          display: block;
          font-size: 12px;
          margin-bottom: .5em;
        }
      }
    }
  }
</style>
