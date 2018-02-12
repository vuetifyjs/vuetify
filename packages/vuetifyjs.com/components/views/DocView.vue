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
  import { camel } from '@/util/helpers'

  export default {
    components: {
      AppAd,
      AppFooterAlt,
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

        return this.$t(header)
      },
      headerText () {
        const headerText = `${this.namespace}.headerText`

        return this.$t(headerText)
      },
      namespace () {
        const route = this.$route.path.split('/').slice(2)

        // If a root page, prefix namespace with Vuetify
        if (route.length === 1) route.unshift('vuetify')

        return route.map(s => camel(s)).join('.')
      },
      computedToc () {
        if (this.toc.length > 0) return this.toc

        const toc = `${this.namespace}.toc`

        return this.$te(toc)
          ? this.$t(toc)
          : this.$te(toc, 'en')
            ? this.$t(toc, 'en')
            : []
      }
    }
  }
</script>
