<template>
  <v-main>
    <v-responsive
      class="mx-auto overflow-visible"
      max-width="1024"
    >
      <v-container>
        <documentation-breadcrumbs />

        <v-responsive
          class="overflow-visible"
          min-height="90vh"
        >
          <router-view />
        </v-responsive>

        <documentation-contribution />
      </v-container>
    </v-responsive>
  </v-main>
</template>

<script>
  export default {
    name: 'DocumentationView',

    components: {
      DocumentationBreadcrumbs: () => import('./Breadcrumbs'),
      DocumentationContribution: () => import('./Contribution'),
    },
  }
</script>
