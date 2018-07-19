<template lang="pug">
  v-container.page
    v-layout
      v-flex(xs12)
        helpers-page-head(
          :header="header"
          :text="headerText"
        )
          div(slot="sup")
            slot(name="sup")
        slot(:namespace="namespace")
        core-footer-alt
</template>

<script>
  import { camel } from '@/util/helpers'

  export default {
    computed: {
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
      }
    }
  }
</script>
