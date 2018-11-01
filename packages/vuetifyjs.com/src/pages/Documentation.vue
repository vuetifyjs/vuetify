<template>
  <v-fade-transition mode="out-in">
    <core-page
      :page="page"
      :namespace="namespace"
    />
  </v-fade-transition>
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
