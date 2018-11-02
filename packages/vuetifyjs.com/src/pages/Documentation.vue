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
      }
    }
  }
</script>
