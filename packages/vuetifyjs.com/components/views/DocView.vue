<template lang="pug">
  v-container.page
    v-layout
      v-flex(xs12 md9)
        page-head(
          :header="header"
          :text="headerText"
        )
          div(slot="sup")
            slot(name="sup")
        slot(:namespace="namespace")
        app-footer
      v-flex(md3 hidden-sm-and-down)
        app-table-of-contents(
          threshold="50"
          offset="85"
          :items="computedToc"
        )
          app-ad(slot="top")
</template>


<script>
  import AppAd from '@/components/core/AppAd'
  import AppFooter from '@/components/core/AppFooter'
  import AppTableOfContents from '@/components/core/AppTableOfContents'
  import { camel } from '@/util/helpers'

  export default {
    components: {
      AppFooter,
      AppAd,
      AppTableOfContents
    },

    props: {
      toc: {
        type: Array,
        default: () => ([])
      }
    },

    computed: {
      header () {
        const header = `${this.namespace}.header`

        return this.$te(header) ? this.$t(header) : ''
      },
      headerText () {
        const headerText = `${this.namespace}.headerText`

        return this.$te(headerText) ? this.$t(headerText) : ''
      },
      namespace () {
        const route = this.$route.path.slice(1).split('/')

        return route.map(s => camel(s)).join('.')
      },
      computedToc () {
        if (this.toc.length > 0) return this.toc

        const toc = `${this.namespace}.toc`

        return this.$te(toc) ? this.$t(toc) : []
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../node_modules/vuetify/src/stylus/settings/_variables.styl'

  .page
    max-width: 1185px !important
    padding-top: 75px
    padding-bottom: 0
    transition: .2s $transition.fast-out-slow-in
    transform: translateZ(0)
    
    section
      margin-bottom: 48px
</style>
