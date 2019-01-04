<template>
  <div>
    <core-drawer />

    <core-ad />

    <core-view
      :namespace="namespace"
      :page="page"
      :lang="lang"
    />

    <core-fab />

    <core-snackbar />
  </div>
</template>

<script>
  export default {
    name: 'Documentation',

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
