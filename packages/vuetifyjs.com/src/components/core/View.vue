<template>
  <v-content>
    <core-page
      :page="page"
      :namespace="namespace"
      :lang="lang"
      :key="$route.path"
    />
  </v-content>
</template>

<script>
  export default {
    props: {
      // Provided by router
      namespace: {
        type: String,
        default: undefined
      },
      page: {
        type: String,
        default: undefined
      },
      lang: {
        type: String,
        default: undefined
      }
    }
  }
</script>
