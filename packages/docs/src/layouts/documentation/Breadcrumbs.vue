<template>
  <v-breadcrumbs
    :items="breadcrumbs"
    class="px-0 py-5"
  />
</template>
<script>
  // Utilities
  import {
    get,
  } from 'vuex-pathify'

  export default {
    name: 'DocumentationBreadcrumbs',

    computed: {
      breadcrumbs: get('documentation/breadcrumbs'),
    },
  }
</script>
