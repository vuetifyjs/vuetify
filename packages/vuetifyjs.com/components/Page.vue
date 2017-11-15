<template lang="pug">
  v-container(:id="id").page
    v-layout
      v-flex(xs12 md9)
        slot
        app-footer
      v-flex(md3 hidden-sm-and-down)
        app-table-of-contents(
          threshold="50"
          offset="85"
          :items="toc"
        )
          app-ad(slot="top")
</template>

<script>
  import AppAd from '@core/AppAd'
  import AppFooter from '@core/AppFooter'
  import AppTableOfContents from '@core/AppTableOfContents'

  export default {
    name: 'page',

    components: {
      AppAd,
      AppFooter,
      AppTableOfContents
    },

    props: {
      id: {
        type: String,
        default () {
          return this._uid.toString()
        }
      },
      toc: {
        type: Array,
        default: () => ([])
      }
    }
  }
</script>

<style lang="stylus">
  .page
    max-width: 1185px !important
    padding-top: 75px
    padding-bottom: 0
    
    section
      margin-bottom: 48px
</style>