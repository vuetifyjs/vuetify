<template>
  <v-container class="bg-primary d-flex align-center justify-center pa-md-12 pa-sm-6" min-height="550" fluid>
    <v-responsive class="mx-auto text-center" max-width="700">
      <v-img
        :width="$vuetify.display.mdAndUp ? 500 : 300"
        alt="Vuetify One Logo"
        class="mb-8 mx-auto"
        src="https://cdn.vuetifyjs.com/docs/images/one/logos/vone-logo-dark.png"
      />

      <h1 class="text-h4 text-md-h2 font-weight-bold mb-4 text-white">
        Elevate Your Vuetify Experience
      </h1>

      <p class="text-body-1 text-md-h6 text-white text-opacity-80 mb-8">
        Join the community shaping the future of Vuetify. Access exclusive support today and early access to next-gen tools like MCP, shared workspaces, and team-wide cloud features.
      </p>

      <div class="d-flex ga-4 justify-center">
        <v-btn
          :loading="one.isLoading"
          class="text-primary text-none"
          color="white"
          rounded="lg"
          size="x-large"
          text="Join Vuetify One"
          to="#subscribe"
        />
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  const one = useOneStore()
</script>
