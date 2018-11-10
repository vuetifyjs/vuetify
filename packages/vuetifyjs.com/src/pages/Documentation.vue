<template>
  <div>
    <core-ad />

    <core-toolbar />

    <core-drawer />

    <core-view
      :namespace="namespace"
      :page="page"
    />

    <core-fab />

    <core-snackbar />
  </div>
</template>

<script>
  // https://ssr.vuejs.org/guide/data.html#store-code-splitting
  import docModule from '@/store/modules/documentation'

  export default {
    name: 'Documentation',

    asyncData ({ store }) {
      store.registerModule('documentation', docModule)
    },

    props: {
      // Provided by router
      namespace: {
        type: String,
        default: undefined
      },
      page: {
        type: String,
        default: undefined
      }
    },

    destroyed () {
      this.$store.unregisterModule('documentation')
    }
  }
</script>
