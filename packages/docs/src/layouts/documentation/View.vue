<template>
  <v-content>
    <v-responsive
      class="mx-auto"
      max-width="1024"
    >
      <v-container>
        <documentation-breadcrumbs />

        <router-view />
      </v-container>
    </v-responsive>
  </v-content>
</template>

<script>
  export default {
    name: 'DocumentationView',

    components: {
      DocumentationBreadcrumbs: () => import('./Breadcrumbs'),
    },
  }
</script>
