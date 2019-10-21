<template>
  <v-content>
    <v-responsive
      class="mx-auto"
      max-width="1024"
    >
      <v-container>
        <documentation-breadcrumbs />

        <v-responsive min-height="90vh">
          <v-fade-transition hide-on-leave>
            <router-view :key="$route.path" />
          </v-fade-transition>
        </v-responsive>

        <documentation-contribution />
      </v-container>
    </v-responsive>
  </v-content>
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
