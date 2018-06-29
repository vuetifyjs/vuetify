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
        app-footer-alt
      v-flex(md3 hidden-sm-and-down)
        app-table-of-contents(
          :threshold="50"
          :offset="85"
          :items="computedToc"
        )
          app-ad
</template>

<script>
  import AppAd from '@/components/core/AppAd'
  import AppFooterAlt from '@/components/core/AppFooterAlt'
  import AppTableOfContents from '@/components/core/AppTableOfContents'
  import { mapState } from 'vuex'
  import { camel } from '@/util/helpers'
  import { getObjectValueByPath } from 'vuetify/es5/util/helpers'

  export default {
    components: {
      AppAd,
      AppFooterAlt,
      AppTableOfContents
    },

    props: {
      toc: {
        type: String,
        default: null
      }
    },

    computed: {
      ...mapState({
        tocs: state => state.app.tablesOfContents
      }),
      header () {
        return `${this.namespace}.header`
      },
      headerText () {
        return `${this.namespace}.headerText`
      },
      namespace () {
        const route = this.$route.path.split('/').slice(2)

        // If a root page, prefix namespace with Vuetify
        if (route.length === 1) route.unshift('vuetify')

        return route.map(s => camel(s)).join('.')
      },
      computedToc () {
        return getObjectValueByPath(this.tocs, this.toc || this.namespace) || []
      }
    }
  }
</script>
