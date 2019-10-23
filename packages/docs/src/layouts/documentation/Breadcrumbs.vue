<template>
  <v-breadcrumbs
    v-if="structure !== false"
    :items="breadcrumbs"
    class="px-0 py-5"
  />
</template>
<script>
  // Utilities
  import {
    get,
    sync,
  } from 'vuex-pathify'

  export default {
    name: 'DocumentationBreadcrumbs',

    computed: {
      breadcrumbs: get('documentation/breadcrumbs'),
      structure: sync('documentation/structure'),
    },
  }
</script>
